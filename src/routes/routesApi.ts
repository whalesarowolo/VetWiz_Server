import express from 'express';
import { auth } from './../utils/auth';
import { IAuth } from './../utils/auth.d';
import {
  createUser,
  loginUser
} from './../controllers/auth.controller';
import {

  topUpUser,
  topUpVerify
} from './../controllers/topup.controller';

const router = express.Router();

//User Routes
router.post('/register', createUser);
router.post('/login', loginUser);

//Topup Routes
router.post('/paystack/topup', <any>auth, topUpUser);
router.get('/topup/verify/:reference', <any>auth, topUpVerify)

export default router;