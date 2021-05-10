import { Request, Response, NextFunction } from "express";
import userModel from "../models/user/user";
import { UploadedFile } from "express-fileupload";
import { uploadFile } from "../utils/uploader";

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
      { new: true, upsert: true }
    );
    res.status(201).json(newUser);
  } catch (error) {
    next({
      message: "User update failed",
      error,
    });
  }
};

export const updateUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.userData!;
    let avatar = req.files?.file as UploadedFile;
    const cloudinaryResponse: any = await uploadFile(avatar, "image", "avatar");

    const newUser = await userModel.findByIdAndUpdate(userId, {
      $set: {
        avatar: cloudinaryResponse.secure_url,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    next({
      message: "User avatar update failed",
      error,
    });
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      gender,
      email,
      phoneNumber,
      category,
      state = "",
      lga = "",
    } = req.body;
    const { userId } = req.userData!;
    const newUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(firstName && { fname: firstName }),
          ...(lastName && { lname: lastName }),
          ...(email && { email }),
          ...(phoneNumber && { phoneNumber }),
          ...(gender && { gender }),
          ...(category && { bizCategory: category }),
          ...(state && { state }),
          ...(lga && { lga }),
        },
      },
      { new: true, upsert: true }
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
