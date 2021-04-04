import { Schema } from "mongoose";

export const LocationSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    userEmail: {
      type: String
    },
    userPhone: {
      type: String
    },
    lat: {
      type: String
    },
    long: {
      type: String
    },
    action: {
      type: String
    },
    timeTaken: {
      type: String
    },
  },
  { timestamps: true }
);
