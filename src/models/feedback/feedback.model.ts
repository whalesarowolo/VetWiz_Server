import { Schema } from "mongoose";

export const FeedbackSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    userEmail: {
      type: String,
    },
    userPhone: {
      type: String,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    type: {
      type: String,
    },
    media: {
      type: [String],
    },
  },
  { timestamps: true }
);
