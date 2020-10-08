import { Schema } from 'mongoose';

export const TopUpSchema: Schema = new Schema({
  transferRef: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  topUpAmount: {
    type: String
  },
  paymentGateway: {
    type: String,
    default: "paystack",
    enum: ["paystack", "flutterwave"]
  },
  amountToGateway: {
    type: Number,
    default: 0
  },
  topUpStatus: {
    type: String,
    enum: ["pending", "successful", "failed"],
    default: "pending"
  },
  reason: {
    type: String
  },
}, { timestamps: true })