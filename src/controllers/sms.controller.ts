import { Request, Response, NextFunction } from 'express'
import smsModel from './../models/sms/sms';
import walletModel from './../models/wallet/wallet';
import { ISms } from '../models/sms/sms.d';
import { IWallet } from './../models/wallet/wallet.d';
import { IUser } from '../models/user/user.d';


export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData : IUser | undefined = req.userData
    const userId: IUser['_id'] = userData?._id
    const {
      sender,
      receiver,
      message,
      crop,
      location,
      state,
      lga
    }: {
      sender: ISms['sender'],
      receiver: ISms['receiver'],
      message: ISms['message'],
      crop: ISms['crop'],
      location: ISms['location'],
      state: ISms['state'],
      lga: ISms['lga']
    } = req.body
    const cost: number = receiver.length * 5
    const wallet : IWallet | null = await walletModel.findOne({userId}).lean()
    if(wallet){
      const {balance} = wallet
    if ((Number(balance) < cost)) {
      res.status(402).json({
        message: 'Funds insufficient to send message. Please top up your wallet'
      })
      return;
    }
    

    }
    

  } catch (error) {
    return next({
      message: "Sending Message failed",
      error: error,
    })
  }
}