import { Document } from "mongoose";
import { IUser } from "../user/user.d";
import { IWallet } from "../wallet/wallet.d";

export interface ISms extends Document {
  senderId?: string;
  receivers?: string[];
  message?: string;
  crops?: string[];
  location?: string[];
  state?: string;
  lga?: string;
}
