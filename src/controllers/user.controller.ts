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
    console.log(req.body);
    const { userId } = req.userData!;
    const newUser = await userModel.findByIdAndUpdate(
      userId,
      {
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
      },
      { new: true, upsert: true, select: "-password" }
    );
    res.status(201).json(newUser);
  } catch (error) {
    next({
      message: "User update failed",
      error,
    });
  }
};

// export const createNVRIUsers = async (req: any, res: any) => {
//   try {
//     for (const user of users) {
//       await userModel
//         .create({
//           email: user?.email ?? "",
//           userRole: ["user", "vet"],
//           password: user?.password ?? "",
//           phoneNumber: user?.phone ?? "",
//           createdAt: user.date.$date,
//           bizCategory: user.role,
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
