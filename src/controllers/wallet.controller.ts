import { Request, Response, NextFunction } from "express";
import walletModel from "../models/wallet/wallet";

export const getWalletBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.userData!;
    const wallet = await walletModel.findOne({ user: userId }).lean();
    if (wallet) {
      res.status(200).json(wallet);
    }
  } catch (error) {
    next({
      message: "could not fetch wallet",
      error,
    });
  }
};
