import { Document } from 'mongoose';
import { IUser } from '../user/user';
import { IWallet } from '../wallet/wallet';

export interface ISms extends Document {
  sender: string,
  receiver: string[],
  message: string,
  crop?: string[],
  location?: string,
  state?: string,
  lga?: string,
  user: IUser['_id'],
  wallet: IWallet['_id']
}
