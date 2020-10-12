import { Request, Response, NextFunction } from 'express'
import smsModel from './../models/sms/sms';
import walletModel from './../models/wallet/wallet';
import { ISms } from '../models/sms/sms.d';
import { IAuthModel } from './../utils/auth.d';
import https from 'https';
import { IUserModel } from '../models/user/user.d'
import userModel from './../models/user/user';


export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId }: IAuthModel | undefined = req.userData!
    const {
      sender,
      message,
      crop,
      location,
      state,
      lga
    }: {
      sender: ISms['sender'],
      message: ISms['message'],
      crop: ISms['crop'],
      location: ISms['location'],
      state: ISms['state'],
      lga: ISms['lga']
    } = req.body

    const receiver = await userModel.find({}, { phoneNumber: 1, _id: 0 }).limit(19).lean().exec()
    const cost: number = receiver!.length * 5
    const wallet = await walletModel.findOne({ user: userId }).lean()
    if (wallet) {
      const { balance } = wallet
      if ((Number(balance) < cost)) {
        res.status(402).json({
          message: 'Funds insufficient to send message. Please top up your wallet'
        })
        return;
      }
      const allPhones: string[] = receiver && receiver.map(obj => obj?.phoneNumber!)
      const phoneNums = Array.isArray(allPhones) && allPhones.join(",")
      const results = await https.get(
        'https://smartsmssolutions.com/api/?message=' + message + '&to=' + phoneNums + '&sender_id=Farm+Aid&type=0&routing=4&token=WFFWrxhHdO4HEazCHOHEl1VOTpzovVAG80e3dyCesrmxwoOIO16UqEoO4aSowdfwLCqYkqne2PGNkqNiSkxeQoPlt2So6R50wqAa');
      if (results) {
        const newBalance = Number(balance) - cost
        const updateWallet = await walletModel.findOneAndUpdate(
          {
            user: userId
          },
          {
            $set: {
              balance:
                String(newBalance),
            },
          },
          {
            new: true,
            upsert: true,
            rawResult: true,
          }).lean().exec()
        const newMessage = await smsModel.create({
          sender,
          receiver: allPhones,
          message,
          crop,
          location,
          state,
          lga,
          wallet: wallet._id
        })
        if (newMessage) {
          res.status(201).json({
            message: "Message sent and created",
            data: newMessage.toObject(),
            wallet: updateWallet?.value
          })
          return
        }
        res.status(200).send({
          message: "Message sent"
        })
      }
    } else {
      res.status(404).send({
        message: "User wallet not found"
      })
    }
  } catch (error) {
    return next({
      message: "Sending Message failed",
      error: error,
    })
  }
}

export const getUserMessageHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.userData!
    const allMessages = smsModel.find({ user: userId }).lean().exec()
    if (allMessages) {
      res.status(200).json({
        message: "sucessful fetching messages",
        data: allMessages
      })
    }
  } catch (error) {
    next({
      message: "could not fetch message history",
      err: error
    })
  }
}