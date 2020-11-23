import { Request, Response, NextFunction } from "express";
import { IAuthModel } from "../utils/auth.d";
import diagnosisModel from "../models/diagnosis/diagnosis";
import { IDiagnosis } from "../models/diagnosis/diagnosis.d";

export const saveAnimalDiseaseDiagnosis = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { diseaseDiagnosisDetails } = req.body;
  const { userId, email, phoneNumber }: IAuthModel = req.userData!;
  Promise.all(
    diseaseDiagnosisDetails.map(
      async (details: {
        keywordsSearched: string[];
        animal: string;
        diseasesFound: string[];
      }): Promise<IDiagnosis> => {
        const diagnosis = new diagnosisModel({
          userId,
          userEmail: email,
          userPhone: phoneNumber,
          keywordsSearched: details.keywordsSearched,
          animal: details.animal,
          diseasesFound: details.diseasesFound,
        });
        return await diagnosis.save();
      }
    )
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      return next({
        message: "Error Saving the Diagnosis result",
        error,
      });
    });
};
