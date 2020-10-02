import { Schema } from 'mongoose';

export const SmsSchema: Schema = new Schema({
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: [String],
    required: true,
  },
  message: {
    type: String,
    required: true,
    default: ""
  },
  crop: {
    type: [String]
  },
  location: {
    type: String
  },
  state: {
    type: String
  },
  lga: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  wallet: {
    type: Schema.Types.ObjectId,
    ref: "wallet"
  }
}, {
  timestamps: true
})
