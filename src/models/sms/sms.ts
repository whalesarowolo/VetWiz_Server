import { model } from 'mongoose';
import { ISms } from './sms.d';
import { SmsSchema } from './sms.model';

const smsModel = model<ISms>('sms', SmsSchema)
export default smsModel;