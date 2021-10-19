import { Document, Model } from "mongoose";

export interface IUser {
  fname?: string;
  lname?: string;
  email?: string;
  userRole: string[];
  password?: string;
  phoneNumber?: string;
  gender?: string;
  company?: string;
  bizCategory?: string;
  profilePic?: string;
  dateOfBirth?: string;
  state?: string;
  lga?: string;
  shop?: string;
  community?: string;
  disability?: string;
  maritalStatus?: string;
  education?: string;
  crops?: string[];
  animals?: string[];
  farmSize?: string;
  farmIncome?: string;
  farmLocation?: string;
  farmerCooperative?: string;
  active?: boolean;
  createdAt?: string;
}

export interface IUserModel extends IUser, Document {
  checkPassword(pass): (password: string) => Promise<boolean>;
}

export enum UserRoles {
  admin = 'admin'

}