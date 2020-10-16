import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'
import { IUserModel } from '../models/user/user.d';
import { IAuthModel } from './auth.d';

export const newToken = (user: IUserModel): string =>
  jwt.sign(
    {
      email: user.email,
      phone: user.phoneNumber,
      userRole: user.userRole,
      active: user.active,
      userId: user._id,
      fname: user.fname,
      lname: user.lname
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  )

export const verifyToken = (token: string): Promise<IAuthModel> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error) return reject(error)
      resolve(payload as IAuthModel)
    })
  })

export const auth = async (req: IAuthModel, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : ""

    const decoded = await verifyToken(token)
    if (decoded && decoded.active) {
      req.userData = decoded
    } else {
      return res.status(401).json({
        message: "User is not Active",
      })
    }
  } catch (error) {
    return res.status(401).json({
      message: "User Authentication Failed",
      error,
    })
  }
  next()
}
