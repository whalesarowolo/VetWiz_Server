
import { Request, Express } from 'express';
import { IUser } from '../models/user/user';



export interface IAuth extends Request {
  userData: IUser
}