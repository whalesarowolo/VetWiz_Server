import { Request, Response, NextFunction } from "express";
import { IAuthModel } from "../utils/auth.d";
import feedbackModel from "../models/feedback/feedback";
import { sendMail } from "../services/mailingServices/mail"

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
      sendMail({
        to: 'info@vetwiz.app, info@farmnovation.com, noseji@farmnovation.com, aogaga@farmnovation.com',
        from: 'info@vetwiz.app',
        subject: 'Feedback from Vetwiz App',
        text: '',
        html: `<h3>${type}</h3>
          <p>${email}</p>
          <p>${phoneNumber}</p>
          <p>${title}</p>   
          <p>${message}</p> 
        `
      }, res, next)
      return res.status(201).json(newFeedback);
    }
  } catch (error) {
    return next({
      message: "Error Saving the Feedback",
      error,
    });
  }
};
