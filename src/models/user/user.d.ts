import { Document, Model } from "mongoose";

export interface IUser extends Document {
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

export interface IUserModel extends IUser {
  checkPassword(pass): (password: string) => Promise<boolean>;
}
