import { model } from 'mongoose';
import { ITopUp } from './topup.d';
import { TopUpSchema } from './topup.model'

const topUpModel = model<ITopUp> ('topUp', TopUpSchema)
export default topUpModel;
