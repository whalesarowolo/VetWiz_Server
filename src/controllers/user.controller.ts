import { Request, Response, NextFunction } from "express";
import userModel from "../models/user/user";

export const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      company = "",
      dob = "",
      state = "",
      lga = "",
      lat = "",
      long = "",
      userRole = [],
      crops = [],
    } = req.body;
    const { userId } = req.userData!;
    const newUser = await userModel.findByIdAndUpdate(userId, {
      $set: {
        ...(company && { company }),
        ...(dob && { dob }),
        ...(state && { state }),
        ...(lga && { lga }),
        ...(lat && { lat }),
        ...(long && { long }),
        ...(userRole.length > 0 && { userRole }),
        ...(crops.length > 0 && { crops }),
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    next({
      message: "User update failed",
      error,
    });
  }
};
