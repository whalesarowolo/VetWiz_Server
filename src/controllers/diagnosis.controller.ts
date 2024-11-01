import { Request, Response, NextFunction } from "express";
import { IAuthModel } from "../utils/auth.d";
import diagnosisModel from "../models/diagnosis/diagnosis";
import { IDiagnosis } from "../models/diagnosis/diagnosis.d";
import { ILocation } from "../models/location/location.d";
import locationModel from "../models/location/location";

/**
 * Save animal disease diagnosis details.
 * This function processes the diagnosis details and saves them to the database.
 * It also saves the user's location if provided.
 */
export const saveAnimalDiseaseDiagnosis = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { diseaseDiagnosisDetails } = req.body;
    const { userId, email, phoneNumber }: IAuthModel = req.userData!;

    const diagnosisPromises = diseaseDiagnosisDetails.map(
      async (details: {
        keywordsSearched: string[];
        animal: string;
        diseasesFound: string[];
        location: {
          action: string;
          lat: string;
          long: string;
          timeTaken: string;
        } | undefined;
      }): Promise<IDiagnosis> => {
        let userLocation: ILocation = null as unknown as ILocation;
        if (details.location) {
          userLocation = await locationModel.create({
            userId,
            userEmail: email,
            userPhone: phoneNumber,
            lat: details.location.lat,
            long: details.location.long,
            action: details.location.action,
            timeTaken: details.location.timeTaken,
          });
        }
        return await diagnosisModel.create({
          userId,
          userEmail: email,
          userPhone: phoneNumber,
          keywordsSearched: details.keywordsSearched,
          animal: details.animal,
          diseasesFound: details.diseasesFound,
          ...(userLocation && { location: userLocation?._id }),
        });
      }
    );

    const response = await Promise.all(diagnosisPromises);
    res.status(200).json(response);
  } catch (error) {
    next({
      message: "Error Saving the Diagnosis result",
      error,
    });
  }
};

export const getDiseaseDiagnosisCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const diagnosisCount = await diagnosisModel.find({}).count()
    await res.status(200).json({ data: diagnosisCount });
  } catch (error) {
    next({
      message: "Error getting diagnosis count",
      error,
    });
  }
};