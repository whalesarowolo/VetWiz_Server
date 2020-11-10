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
    images: [String],
    status: {
      type: String,
      default: "approved",
      enum: ["pending", "approved", "disapproved"],
    },
    states: {
      type: [String],
    },
    lgas: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    accessibleRoles: {
      type: [String],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
