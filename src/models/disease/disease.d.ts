import { Document } from "mongoose";
import { IUser } from "../user/user.d";

export interface IDisease extends Document {
  name: string;
  nameLanguages: {
    language: string;
    name: string;
  }[];
  animal?: string;
  crop?: string;
  infectionPossibilities: string[];
  symptoms?: string[];
  treatment?: string;
  vaccine?: string;
  prevention: string[];
  emergency?: boolean;
  keyword: string[];
  images?: string[];
  createdBy?: IUser["_id"];
}
