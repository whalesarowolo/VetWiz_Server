import { Schema } from 'mongoose';

export const WalletSchema: Schema = new Schema({
  balance: {
    type: String,
    default: 0,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
}, {timestamps: true})