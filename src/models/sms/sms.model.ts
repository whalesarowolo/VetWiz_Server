import { Schema } from "mongoose";

export const SmsSchema: Schema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    receivers: {
      type: [String],
    },
    message: {
      type: String,
      required: true,
      default: "",
    },
    selectedReach: {
      type: String,
      required: true,
      default: "",
    },
    crops: {
      type: [String],
    },
    location: {
      type: [String],
    },
    states: {
      type: String,
    },
    lgas: {
      type: String,
    },
    approverId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "disapproved"],
      default: "pending",
    },
    statusDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
