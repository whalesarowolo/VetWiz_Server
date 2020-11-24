import { Document } from "mongoose";

export interface IFeedback extends Document {
  user: string;
  userEmail?: string;
  userPhone?: string;
  title: string;
  message: string;
  type: string;
  media: string[];
}
