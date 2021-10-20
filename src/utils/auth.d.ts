import { Request, Express } from "express";
import { IUserModel } from "./../models/user/user.d";

export interface IAuthModel extends Request {
  userId: IUserModel["_id"];
  email: IUserModel["email"];
  userRole: IUserModel["userRole"];
  active: IUserModel["active"];
  phoneNumber: IUserModel["phoneNumber"];
  lname: IUserModel["lname"];
  fname: IUserModel[];
}

interface Notification {
    title?: string;
    body?: string;
    imageUrl?: string;
}
export interface IPushNotification {
  notification: Notification;
  android?: {
    notification?: Notification;
    priority?: ('high' | 'normal');
  };
  topic: string;
}
// export interface IAuth extends Request {
//   userData: IUserModel
// }
