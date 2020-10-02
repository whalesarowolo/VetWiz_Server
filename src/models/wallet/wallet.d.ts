import { Document } from 'mongoose';
import { IUser } from '../user/user';

export interface IWallet extends Document {
  balance: string,
  user: IUser['_id']
}