import { Request, Response, NextFunction } from "express";
import excelToJson from "convert-excel-to-json";
import { IAuthModel } from "../utils/auth.d";
import { readFileSync, fstat, unlinkSync } from "fs";
import shopModel from "../models/vet-shop/shop";
import { IShop } from "../models/vet-shop/shop.d";
import userModel from "../models/user/user";

const getLocationFromString = (locationUrl: string, type: string): string => {
  return (
    locationUrl
      ?.split("?")[1]
      ?.split("=")
      [type === "mlat" ? 1 : 2]?.split("&")[0] ?? ""
  );
};

export const createVetShopsFromExcel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userRole }: IAuthModel = req.userData!;
  if (userRole.includes("admin")) {
    res.status(403).json({ message: "Only Admins can upload Bulk Users" });
  }
  let excelFile = req.files?.file;
  if (!excelFile) res.status(404).json({ message: "File not found" });
  excelFile?.mv(
    `${__dirname}-vetwiz-vetshop`,
    async (err): Promise<void> => {
      if (err) {
        next({
          message: "Generating Details from excel failed",
          error: err,
        });
      }
      try {
        const result = await excelToJson({
          source: readFileSync(`${__dirname}-vetwiz-vetshop`),
          header: {
            rows: 1,
          },
          sheets: ["Sheet1"],
          columnToKey: {
            A: "onboardDate",
            B: "name",
            C: "address",
            D: "location",
            E: "contactPhone",
            F: "shopAge",
            G: "cacRegistered",
            H: "animalFeed",
            I: "vaccine",
            J: "drugs",
            K: "accessories",
            L: "other",
            M: "nvirRegistered",
            N: "interStateSales",
          },
        });
        unlinkSync(`${__dirname}-vetwiz-vetshop`);
        const { Sheet1: sheet } = result;
        let errorArray: IShop[] = [];
        for (const shop of sheet) {
          await shopModel
            .create({
              onboardDate: shop.onboardDate,
              name: shop.name,
              address: shop.address,
              lat: getLocationFromString(shop?.location, "mlat"),
              long: getLocationFromString(shop?.location, "mlon"),
              contactPhone: shop.contactPhone,
              shopAge: shop?.shopAge,
              cacRegistered: shop?.cacRegistered === "yes",
              nvirRegistered: shop?.nvirRegistered == "yes",
              interStateSales: shop?.interStateSales == "outside_state",
              animalFeed: shop?.animalFeed == "1",
              vaccine: shop?.vaccine == "1",
              drugs: shop?.drugs == "1",
              accessories: shop?.accessories == "1",
              other: shop?.other == "1",
            })
            .catch((error) => {
              errorArray.push(shop);
            });
        }
        if (!!errorArray.length)
          await res.status(201).json({
            message: "Vetshops created except the following",
            data: errorArray,
          });
        await res.status(201).json({ message: "Vet shops saved" });
      } catch (error) {
        return next({
          message: "saving vetshops failed",
          error,
        });
      }
    }
  );
};

export const getVetShops = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const shops = await shopModel.find({}).lean();
    res.status(200).json(shops);
  } catch (error) {
    next({
      message: "saving vetshops failed",
      error,
    });
  }
};

export const getMyStateVetShops = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId }: IAuthModel = req.userData!;
    const user = await userModel.findById(userId);
    const shops = await shopModel
      .find({
        ...(user?.state
          ? { state: { $regex: user?.state, $options: "i" } }
          : {}),
      })
      .lean();
    res.status(200).json(shops);
  } catch (error) {
    next({
      message: "saving vetshops failed",
      error,
    });
  }
};

export const getStateVetShopsFromUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { state } = req.query as any;
    const shops = await shopModel
      .find({
        ...(state
          ? { state: { $regex: state, $options: "i" } }
          : {}),
      })
      .lean();
    res.status(200).json(shops);
  } catch (error) {
    next({
      message: "saving vetshops failed",
      error,
    });
  }
};