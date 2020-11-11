import { Request, Response, NextFunction } from "express";
import { IAuthModel } from "./../utils/auth.d";
import userModel from "./../models/user/user";
import diseaseModel from "../models/disease/disease";

export const getDiseases = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { isCrop, isAnimal } = req.query as any;
    const { userId }: IAuthModel = req.userData!;
    const filteredDiseases = await diseaseModel
      .find({
        ...(isCrop && { crop: { $ne: "" } }),
        ...(isAnimal && { animal: { $ne: "" } }),
      })
      .select(" -createdBy")
      .lean();
    res.status(200).json(filteredDiseases);
  } catch (error) {
    return next({
      message: "Getting diseases failed",
      error,
    });
  }
};

export const getSingleDisease = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.query as any;
    const { userId }: IAuthModel = req.userData!;
    const disease = await diseaseModel.findById(id).lean();
    if (!disease) {
      res.status(404).json({ message: "Disease not found" });
    }
    res.status(200).json(disease);
  } catch (error) {
    return next({
      message: "Getting disease failed",
      error,
    });
  }
};
