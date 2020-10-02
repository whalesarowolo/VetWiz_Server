import { Document } from 'mongoose';

export interface ITopUp extends Document {
  transferRef: string,
  userId: string,
  topUpAmount?: string,
  paymentGateway?: string,
  amountToGatway: number,
  userEmail: string,
  topUpStatus?: string,
  reason: string,
  date: Date
}