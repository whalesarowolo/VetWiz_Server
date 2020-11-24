import { Request, Response, NextFunction } from "express";
import { IAuthModel } from "../utils/auth.d";
import feedbackModel from "../models/feedback/feedback";

export const saveFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title = "", message = "", type = "" } = req.body;
    const { userId, email, phoneNumber }: IAuthModel = req.userData!;
    const newFeedback = await feedbackModel.create({
      user: userId,
      userEmail: email,
      userPhone: phoneNumber,
      title,
      type,
      message,
      media: [],
    });
    if (newFeedback) {
      return res.status(201).json(newFeedback);
    }
  } catch (error) {
    return next({
      message: "Error Saving the Feedback",
      error,
    });
  }
};
