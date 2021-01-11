import { Schema } from "mongoose";

export const UserSchema: Schema = new Schema(
  {
    fname: {
      type: String,
      default: "",
    },
    lname: {
      type: String,
      default: "",
    },
    email: {
      type: String,
    },
    userRole: {
      type: [String],
      required: true,
      enum: ["user", "shopRep"],
      default: ["user"],
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    gender: {
      type: String,
    },
    company: {
      type: String,
    },
    bizCategory: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    state: {
      type: String,
    },
    lga: {
      type: String,
    },
    community: {
      type: String,
    },
    disability: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    education: {
      type: String,
    },
    crops: {
      type: [String],
    },
    animals: {
      type: [String],
    },
    farmSize: {
      type: String,
    },
    shop: String,
    farmIncome: {
      type: String,
    },
    farmLocation: {
      type: String,
    },
    farmerCooperative: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
