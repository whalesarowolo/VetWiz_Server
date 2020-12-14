import { Request, Response, NextFunction } from "express";
import smsModel from "./../models/sms/sms";
import walletModel from "./../models/wallet/wallet";
import { ISms } from "../models/sms/sms.d";
import { IAuthModel } from "./../utils/auth.d";
import https from "https";
import { IUserModel } from "../models/user/user.d";
import userModel from "./../models/user/user";
import { SMS_CHARGE } from "../utils/helpers";

export const filterSMSRecipients = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      crops,
      location,
    }: {
      crops: [string];
      location: [string];
    } = req.body;

    const filteredUsers = await userModel
      .find({
        $and: [
          ...crops.map((crop) => ({
            crops: { $regex: crop, $options: "i" },
          })),

          {
            $or: location.map((eachLocation) => ({
              state: { $regex: eachLocation, $options: "i" },
            })),
          },
        ],
      })
      .lean();
    res
      .status(200)
      .json({ filteredUsersCount: filteredUsers.length, filteredUsers });
  } catch (error) {
    return next({
      message: "Sending Message failed",
      error: error,
    });
  }
};

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId }: IAuthModel = req.userData!;
    const {
      message,
      crops,
      location,
      selectedReach,
    }: {
      message: string;
      crops: [string];
      location: [string];
      selectedReach: string;
    } = req.body;

    const receivers = await userModel
      .find(
        {
          $and: [
            ...crops.map((crop) => ({
              crops: { $regex: crop, $options: "i" },
            })),

            {
              $or: location.map((eachLocation) => ({
                state: { $regex: eachLocation, $options: "i" },
              })),
            },
          ],
        },
        "phoneNumber"
      )
      .limit(Number(selectedReach))
      .lean();
    const cost: number = receivers.length * SMS_CHARGE;
    const wallet = await walletModel.findOne({ user: userId }).lean();
    if (wallet) {
      const { balance } = wallet;
      if (Number(balance) < cost) {
        res.status(402).json({
          message:
            "Funds insufficient to send message. Please top up your wallet",
        });
        return;
      }
      const allPhones: string[] = receivers
        .map((obj: any): string => obj.phoneNumber ?? "")
        .filter(Boolean);
      // const phoneNums = allPhones.join(",");
      // const results = await https.get(
      //   "https://smartsmssolutions.com/api/?message=" +
      //     message +
      //     "&to=" +
      //     phoneNums +
      //     "&sender_id=Farm+Aid&type=0&routing=4&token=WFFWrxhHdO4HEazCHOHEl1VOTpzovVAG80e3dyCesrmxwoOIO16UqEoO4aSowdfwLCqYkqne2PGNkqNiSkxeQoPlt2So6R50wqAa"
      // );
      const newMessage = await smsModel.create({
        senderId: userId,
        receivers: allPhones,
        message,
        crops,
        location,
        cost: String(
          Number(selectedReach) * Math.ceil(message.length / 150) * SMS_CHARGE
        ),
        selectedReach,
      });
      const newBalance = Number(balance) - Number(selectedReach) * Math.ceil(message.length / 150) * SMS_CHARGE;
      await walletModel
        .findOneAndUpdate(
          {
            user: userId,
          },
          {
            $set: {
              balance: String(newBalance),
            },
          },
          {
            new: true,
            upsert: true,
            rawResult: true,
          }
        )
        .lean();

      if (newMessage) {
        res.status(201).json({
          message: "Message queued up, awaiting approval",
        });
        return;
      }
    } else {
      res.status(404).send({
        message: "User wallet not found",
      });
    }
  } catch (error) {
    return next({
      message: "Sending Message failed",
      error: error,
    });
  }
};

export const getUserMessageHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.userData!;
    const allMessages = await smsModel.find({ senderId: userId }).lean();
    if (allMessages) {
      res.status(200).json({
        message: "sucessful fetching messages",
        data: allMessages,
      });
    }
  } catch (error) {
    next({
      message: "could not fetch message history",
      err: error,
    });
  }
};
