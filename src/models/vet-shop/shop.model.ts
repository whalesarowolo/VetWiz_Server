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
    long: String,
    lat: String,
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
  },
  { timestamps: true }
);
