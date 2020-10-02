import { Schema } from 'mongoose';

export const TopUpSchema: Schema = new Schema({
  tranferRef: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
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
  userEmail: {
    type: String,
    required: true
  },
  topUpStatus: {
    type: String,
    enum: ["pending", "successful", "failed"],
    default: "pending"
  },
  reason: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })