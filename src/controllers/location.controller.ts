import { NextFunction, Response, Request } from "express";
import locationModel from "../models/location/location";



export const saveUserLocationAndAction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userLocation } = req.body;
  const { userData } = req;
  Promise.all(
    userLocation.map(async (details: {
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
    })
  )
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      return next({
        message: "Error Saving user locations",
        error,
      });
    });
};

