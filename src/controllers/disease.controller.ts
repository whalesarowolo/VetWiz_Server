import { Request, Response, NextFunction } from "express";
import { IAuthModel } from "./../utils/auth.d";
import diseaseModel from "../models/disease/disease";

export const getDiseases = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { isCrop, isAnimal } = req.query as any;
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

// export const createDiseasesFromJson = async (req: any, res: any) => {
//   try {
//     for (const disease of diseases) {
//       await diseaseModel
//         .create({
//           name: disease?.disease ?? "",
//           nameLanguages: [
//             { language: "hausa", name: disease?.diseaseHausa ?? "" },
//             { language: "fulfude", name: disease?.diseaseFulfude ?? "" },
//           ],
//           animal: disease.animal,
//           crop: "",
//           infectionPossibilities: disease.animalAssocaited,
//           symptoms: disease?.symptoms ?? [],
//           treatment: disease?.treatment ?? "",
//           vaccine: disease?.vaccine ?? "",
//           prevention: disease?.prevention ?? [],
//           emergency: disease?.emergency ?? false,
//           keyword: disease?.keyWord ?? [],
//           images: [
//             ...(disease?.diseaseImage1
//               ? [
//                   `https://farm-aid-backend.herokuapp.com/${disease.diseaseImage}`,
//                 ]
//               : []),
//             ...(disease?.diseaseImage1
//               ? [
//                   `https://farm-aid-backend.herokuapp.com/${disease.diseaseImage1}`,
//                 ]
//               : []),
//             ...(disease?.diseaseImage2
//               ? [
//                   `https://farm-aid-backend.herokuapp.com/${disease.diseaseImage2}`,
//                 ]
//               : []),
//           ],
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//     await res.send("Saved");
//   } catch (error) {
//     console.log(error);
//   }
// };
