
import { Request, Express } from 'express';
import { IUserModel } from './../models/user/user.d';

export interface IAuthModel extends Request {
  userId: IUserModel['_id'],
  email: IUserModel['email'],
  userRole: IUserModel['userRole'],
  active: IUserModel['active'],
  phoneNumber: IUserModel['phoneNumber'],
  lname: IUserModel['lname'],
  fname: IUserModel[]
}



// export interface IAuth extends Request {
//   userData: IUserModel
// }