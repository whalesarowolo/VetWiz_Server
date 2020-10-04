import topUpModel from './../models/topup/topup';
import userModel from './../models/user/user';
import walletModel from './../models/wallet/wallet';
import smsModel from './../models/sms/sms';

const models = {
  topUpModel,
  userModel,
  walletModel,
  smsModel,
}

Object.values(models).forEach((model) => {
  model.createCollection()
})