import { Request, Response, NextFunction } from "express";
import locationModel from "../models/location/location";
import { IAuthModel } from "../utils/auth.d";

/**
 * Save user location and action details.
 * This function processes the location details and saves them to the database.
 */
export const saveUserLocationAndAction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userLocation } = req.body;
    const { userData } = req;

    const locationPromises = userLocation.map(async (details: {
      lat: string;
      long: string;
      timeTaken: string;
      action: string;
    }) => {
      const newLocation = new locationModel({
        userId: userData!.userId,
        userEmail: userData!.email,
        userPhone: userData!.phoneNumber,
        lat: details.lat,
        long: details.long,
        action: details.action,
        timeTaken: details.timeTaken,
      });
      return await newLocation.save();
    });

    const response = await Promise.all(locationPromises);
    res.status(201).json(response);
  } catch (error) {
    next({
      message: "Error Saving user locations",
      error,
    });
  }
};