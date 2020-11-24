import { Request, Response, NextFunction } from "express";
import { IUser, IUserModel } from "../models/user/user.d";
import userModel from "../models/user/user";
import { newToken } from "./../utils/auth";
import walletModel from "./../models/wallet/wallet";
import { IAuthModel } from "../utils/auth.d";
import { hash } from "bcrypt";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<object | void> => {
  try {
    const {
      email,
      phoneNumber,
      password,
      occupation,
      firstName,
      lastName,
      gender,
      state,
    } = req.body;
    let user = null;
    user = await userModel.findOne({ phoneNumber }).lean().exec();
    if (user) {
      return res.status(403).json({
        message: `${phoneNumber} already exists`,
      });
    }
    user = await userModel.findOne({ email }).lean().exec();
    if (user) {
      return res.status(403).json({
        message: `${email} already exists`,
      });
    }
    const newUser = await userModel.create({
      email,
      phoneNumber,
      password,
      userRole: occupation,
      fname: firstName,
      lname: lastName,
      gender,
      ...(state && { state }),
    });
    if (newUser) {
      const newWallet = await walletModel.create({
        balance: String(5 * 100),
        user: newUser._id,
      });
      const token = newToken(newUser);
      const val = newUser.toObject();
      if (val) {
        const { password: p, ...rest } = val;
        return res.status(201).json({
          message: "Created  successfully",
          token,
          data: {
            ...rest,
            wallet: newWallet.toObject(),
          },
        });
      }
    }
  } catch (err) {
    return next({
      message: "Registration failed",
      error: err,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, phoneNumber, password }: IUser = req.body;
    let user: IUserModel | null = null;
    if (email) {
      user = await userModel.findOne({ email });
    } else if (phoneNumber && phoneNumber.length > 9) {
      user = await userModel.findOne({
        phoneNumber: { $regex: phoneNumber, $options: "i" },
      });
    }
    if (!user) {
      res.status(401).json({
        message: "Wrong username or password",
      });
    }
    if (user) {
      const match = await user.checkPassword(password!);
      if (!match) {
        res.status(401).json({
          message: "Wrong username or password",
        });
      }
    }

    if (user) {
      const token = newToken(user);
      const { password: p, ...rest } = user.toObject();
      res.status(200).json({
        message: "Login successful",
        token,
        data: rest,
      });
    }
  } catch (error) {
    return next({
      message: "Login failed",
      error: error,
    });
  }
};

export const updateFullName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { firstName, lastName } = req.body;
    const { userId }: IAuthModel = req.userData!;
    const newUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(firstName && { fname: firstName }),
          ...(lastName && { lname: lastName }),
        },
      },
      { new: true }
    );
    if (newUser) {
      const { password: p, ...rest } = newUser.toObject();
      res.status(200).json(rest);
    }
  } catch (error) {
    return next({
      message: "Login failed",
      error: error,
    });
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId }: IAuthModel = req.userData!;
    const { newPassword } = req.body;
    hash(newPassword, 9, (err, hash) => {
      if (err) {
        return next({
          message: "Generating encryption failed",
          error: err,
        });
      }

      const password = hash;
      userModel.findByIdAndUpdate(
        userId,
        {
          $set: { password },
        },
        { new: true },
        async (error, user) => {
          if (error) {
            return next({
              message: "Updating user password failed",
              error,
            });
          }
          if (user) {
            res.status(201).json({
              message: "Your password is updated, Please login again.",
            });
          }
        }
      );
    });
  } catch (error) {
    return next({
      message: "Updating Password failed",
      error,
    });
  }
};
