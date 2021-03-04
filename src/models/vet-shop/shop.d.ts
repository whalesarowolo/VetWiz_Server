import { Document } from "mongoose";

export interface IShop extends Document {
  name: string;
  address: string;
  onboardDate?: string;
  long?: number;
  lat?: number;
  contactPhone: string;
  shopAge?: string;
  cacRegistered?: boolean;
  nvirRegistered?: boolean;
  interStateSales?: boolean;
  animalFeed?: boolean;
  vaccine?: boolean;
  drugs?: boolean;
  accessories?: boolean;
  other?: boolean;
  vcn?: boolean;
  state?: string;
  lga?: string;
  createdAt?: string
}
