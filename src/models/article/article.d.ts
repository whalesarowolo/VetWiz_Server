import { Document } from "mongoose";
import { IUser } from "../user/user.d";

export interface IArticle extends Document {
  _id?: string;
  topic: string;
  body: string;
  image?: string;
  status: string;
  states?: string[];
  lgas?: string[];
  postTypes: string[];
  accessibleRoles?: string[];
  approvedBy?: IUser["_id"];
  createdBy?: IUser["_id"];
}
