import { Schema } from "mongoose";

export const EmergencySchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    lat: {
      type: String,
    },
    long: {
      type: String,
    },
    diseaseId: {
      type: Schema.Types.ObjectId,
      ref: "disease",
    },
    notifyAuthorities: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
