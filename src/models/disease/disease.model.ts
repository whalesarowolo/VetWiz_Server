import { Schema } from "mongoose";

export const DiseaseSchema: Schema = new Schema(
  {
    name: {
      type: String,
      default: "",
      required: true,
    },
    nameLanguages: [String],
    animal: {
      type: String,
      default: "",
    },
    crop: {
      type: String,
      default: "",
    },
    images: [String],
    infectionPossibilities: {
      type: [String],
    },
    treatment: String,
    vaccine: String,
    symptoms: {
      type: [String],
    },
    emergency: Boolean,
    keyword: {
      type: [String],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
