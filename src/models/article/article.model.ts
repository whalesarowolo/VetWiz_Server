import { Schema } from "mongoose";

export const ArticleSchema: Schema = new Schema(
  {
    topic: {
      type: String,
      default: "",
      required: true,
    },
    body: {
      type: String,
      default: "",
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "disapproved"],
    },
    states: {
      type: [String],
    },
    lgas: {
      type: [String],
    },
    postTypes: {
      type: [String],
    },
    accessibleRoles: {
      type: [String],
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
