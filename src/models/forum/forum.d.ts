import {Document, Model} from "mongoose";
import { IUser } from './../user/user.d';

export interface IForum extends Document {
  postTitle:string,
  postDescription: string,
  postPic?: string,
  postType: string,
  postCategory?: string[],
  postAuthor: IUser['_id']
}