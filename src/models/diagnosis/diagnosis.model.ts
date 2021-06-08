import { Schema } from "mongoose";

export const DiseaseSchema: Schema = new Schema(
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
    diseasesFound: [{
      type: String
    }],
    keywordsSearched: [{
      type: String
    }],
    animal: {
      type: String
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'location'
    },
  },
  { timestamps: true }
);
