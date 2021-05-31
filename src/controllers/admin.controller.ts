import { NextFunction, Request, Response } from "express";
import userModel from "../models/user/user";
import { IAuthModel } from "../utils/auth.d";
import { isUserAdmin } from '../utils/helpers'


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId }: IAuthModel = req.userData!
    const { page, limit } = req.query as any
    const isAdmin = await isUserAdmin({ _id: userId }, next)
    if (!isAdmin) return res.status(403).json({ message: "Only Admins can access this resource" })
    const users = page ? await userModel.find({ userRole: { $nin: ["admin"] } }, "-password -disability -crops -animals").skip(page * limit || 20).limit(limit || 20).lean() : await userModel.find({ userRole: { $nin: ["admin"] } }, "-password -disability -crops -animals").lean()
    await res.status(200).json(users)
  } catch (error) {
    next({
      message: "Failed to all Users",
      err: error
    })
  }
}