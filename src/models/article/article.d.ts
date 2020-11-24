import { Document } from "mongoose";
import { IUser } from "../user/user.d";

export interface IArticle extends Document {
  topic: string;
  body: string;
  images?: [string];
  crop?: string;
  category: string;
  states?: string[];
  status: string;
  tags: string[];
  accessibleRoles?: string[];
  premium: boolean;
  createdBy?: IUser["_id"];
}
