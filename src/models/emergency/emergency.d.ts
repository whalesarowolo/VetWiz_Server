import { Document } from "mongoose";

export interface IEmergency extends Document {
  userId: string;
  lat: string;
  long?: string;
  diseaseId: string;
  notifyAuthorities: boolean;
}
