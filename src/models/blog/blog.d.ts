import {Document, Model} from "mongoose";
import { IUser } from './../user/user.d';

export interface IBlog extends Document {
  blogTitle:string,
  blogDescription: string,
  blogAuthor: IUser['_id']
}