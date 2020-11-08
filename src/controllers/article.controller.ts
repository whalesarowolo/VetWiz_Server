import { Request, Response, NextFunction } from "express";
import { IAuthModel } from "./../utils/auth.d";
import userModel from "./../models/user/user";
import { IUser } from "../models/user/user";
import articleModel from "../models/article/article";

export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      postTypes,
    }: {
      postTypes: [string];
    } = req.query;
    const { userId }: IAuthModel = req.userData!;
    const { state, userRole }: IUser = await userModel
      .findById(userId)
      .catch(() => {
        res.status(403).json({ message: "User not found" });
      });
    const filteredArticles = await articleModel
      .find({
        status: "approved",
        $or: userRole.map((role: string) => ({
          accessibleRoles: { $regex: role, $options: "i" },
        })),
      })
      .select("-approvedBy -createdBy")
      .lean();
    res.status(200).json(filteredArticles);
  } catch (error) {
    return next({
      message: "Getting articles failed",
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
      image,
      states,
      lgas,
      postTypes,
      accessibleRoles,
    }: {
      topic: string;
      body: string;
      image: string;
      states: [string];
      lgas: [string];
      postTypes: [string];
      accessibleRoles: [string];
    } = req.body;

    const savedArticle = await articleModel
      .create({
        topic,
        body,
        image,
        states,
        lgas,
        status: "pending",
        postTypes,
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

export const approveArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userRole } = req.userData!;
    const isAllowed = userRole.includes("admin");
    if (!isAllowed) {
      res.status(403).json({ message: "Only Admins can approve status" });
    }
    const { articleId, status } = req.query;
    const article = articleModel.findByIdAndUpdate(articleId, {
      $set: {
        status,
      },
    });
    res.status(201).json({ message: "Updated successfully", data: article });
  } catch (error) {
    next({
      message: "could not fetch message history",
      err: error,
    });
  }
};
