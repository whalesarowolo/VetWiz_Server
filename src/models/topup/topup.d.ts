import { Document } from 'mongoose';
import { IUser } from './../user/user.d';

export interface ITopUp extends Document {
  transferRef?: string,
  user?: IUser['_id'],
  topUpAmount?: string,
  paymentGateway?: string,
  amountToGatway?: number,
  topUpStatus?: string,
  reason?: string,
}
