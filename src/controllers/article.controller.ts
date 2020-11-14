import { Request, Response, NextFunction } from "express";
import { IAuthModel } from "./../utils/auth.d";
import userModel from "./../models/user/user";
import articleModel from "../models/article/article";

export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, crop } = req.query as any;
    const { userId }: IAuthModel = req.userData!;
    const user = await userModel.findById(userId, "-password");
    const filteredArticles = await articleModel
      .find({
        status: "approved",
        ...(category && { category }),
        crop: crop,
        $or: user?.userRole.map((role: string) => ({
          accessibleRoles: { $regex: role, $options: "i" },
        })),
      })
      .select(" -createdBy")
      .lean();
    res.status(200).json(filteredArticles);
  } catch (error) {
    return next({
      message: "Getting articles failed",
      error,
    });
  }
};

export const getNews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { tags } = req.query as any;
    const { userId }: IAuthModel = req.userData!;
    const user = await userModel.findById(userId, "-password");
    const filteredArticles = await articleModel
      .find({
        status: "approved",
        $or: [
          ...tags.map((tag: string) => ({
            tags: { $regex: tag, $options: "i" },
          })),
          ...(user?.userRole.map((role: string) => ({
            accessibleRoles: { $regex: role, $options: "i" },
          })) ?? []),
        ],
      })
      .select(" -createdBy")
      .lean();
    res.status(200).json(filteredArticles);
  } catch (error) {
    return next({
      message: "Getting feed failed",
      error,
    });
  }
};

export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId }: IAuthModel = req.userData!;
    const {
      topic,
      body,
      images,
      states,
      category,
      tags,
      premium = false,
      accessibleRoles,
    }: {
      topic: string;
      body: string;
      images: [string];
      states: [string];
      category: string;
      tags: [string];
      premium: boolean;
      accessibleRoles: [string];
    } = req.body;

    const savedArticle = await articleModel
      .create({
        topic,
        body,
        images,
        states,
        status: "approved",
        tags,
        premium,
        category,
        accessibleRoles,
        createdBy: userId,
      })
      .catch((error: Error) => {
        return next({
          message: "Error saving article",
          error: error,
        });
      });
    res.status(201).json({ message: "Saved successfully", data: savedArticle });
  } catch (error) {
    return next({
      message: "Sending Message failed",
      error: error,
    });
  }
};
