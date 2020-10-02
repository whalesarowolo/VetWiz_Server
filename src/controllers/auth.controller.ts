import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user/user.d';
import userModel from '../models/user/user';
import { newToken } from './../utils/auth';


export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<object | void> => {
  try {
    const {
      email,
      phoneNumber,
      password
    }: {
      email: IUser['email'],
      phoneNumber: IUser['phoneNumber'],
      password: IUser['password']
    } = req.body
    let user = null
    user = await userModel
      .findOne({ phoneNumber })
      .lean()
      .exec()
    if (user) {
      return res.status(403).json({
        message: `${phoneNumber} already exists`,
      })
    }
    user = await userModel
      .findOne({ email })
      .lean()
      .exec()
    if (user) {
      return res.status(403).json({
        message: `${email} already exists`,
      })
    }
    const newUser = await userModel.create({email, phoneNumber, password})
    const token = newToken(newUser)
    const { password: p, ...rest } = newUser
    return res.status(201).json({
      message: "Created  successfully",
      token,
      data: rest,
    })
  } catch (err) {
    return next({
      message: "Registration failed",
      error: err,
    })
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      email,
      phoneNumber,
      password
    } : {
      email: IUser['email'],
      phoneNumber: IUser['phoneNumber'],
      password: IUser['password']
    } = req.body
    let user: IUser | null = null;
    if (email) {
      user = await userModel.findOne({ email })
    } else if (phoneNumber && phoneNumber.length > 9) {
      user = await userModel.findOne({
        phone: { $regex: phoneNumber, $options: "i" },
      }).lean()
    }
    if (!user) {
       res.status(401).json({
        message: "Invalid credentials",
      })
    }
    if (user?.password) {
      const match = await userModel.checkPassword(password)
      if (!match) {
         res.status(401).json({
          message: "Invalid credentials",
        })
      }
    }

    if(user){
       const token = newToken(user)
    const {password: p, ...rest } = user
    res.status(200).json({
      message: "Login successful",
      token,
      data: rest,
    })
    }
   
  } catch (error) {
    return next({
      message: "Login failed",
      error: error,
    })
  }
}