import { Schema } from "mongoose";

export const ShopSchema: Schema = new Schema(
  {
    name: {
      type: String,
      default: "",
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    onboardDate: String,
    long: Number,
    lat: Number,
    contactPhone: String,
    shopAge: String,
    cacRegistered: Boolean,
    nvirRegistered: Boolean,
    interStateSales: Boolean,
    animalFeed: Boolean,
    vaccine: Boolean,
    drugs: Boolean,
    accessories: Boolean,
    other: Boolean,
    vcn: Boolean,
    lga: String,
    state: String,
    position: String,
    email: String
  },
  { timestamps: true }
);
