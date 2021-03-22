import { Document } from "mongoose";

export interface ILocation extends Document {
  userId: string;
  userEmail?: string;
  userPhone?: string;
  lat: string;
  long: string;
  timeTaken?: string;
  device?: string;
  action?: string;
}
