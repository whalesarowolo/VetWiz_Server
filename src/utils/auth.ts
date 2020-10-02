import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'
import { IUser } from '../models/user/user';
import { IAuth } from './auth.d';

export const newToken = (user: IUser): string =>
  jwt.sign(
    {
      email: user.email,
      phone: user.phoneNumber,
      userRole: user.userRole,
      active: user.active,
      userId: user._id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  )

export const verifyToken = (token: string): Promise<IUser> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (error, payload) => {
      if (error) return reject(error)
      resolve(payload as IUser)
    })
  })

export const auth = async (req: IAuth, res: Response, next: NextFunction): Promise<Response | void> => {
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
