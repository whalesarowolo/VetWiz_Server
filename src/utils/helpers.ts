import { NextFunction } from "express";
import userModel from "../models/user/user";

const sendSmsHelper = (
  username: string,
  password: string,
  sender: string,
  recipient: string
) => { };

export const generateTxRef = (passwordLength: number): string => {
  let pass = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const passLength = passwordLength || 8;
  for (let i = 0; i < passLength; i++)
    pass += possible.charAt(Math.floor(Math.random() * possible.length));
  return pass;
};

export const SMS_CHARGE = 5;

export const getNauticalDistance = (distance: number) => {
  return Number(distance) / 110;
};

export const isUserAdmin = async (condition: { [key: string]: string }, next: NextFunction) => {
  try {
    const user = await userModel.findOne(condition).lean()
    return user?.userRole.includes("admin") ?? false
  } catch (error) {
    next({
      err: error,
      message: "Error checking if user is Admin"
    })
  }
}
