import express from 'express';
import { auth } from './../utils/auth';
import {
  createUser,
  loginUser
} from './../controllers/auth.controller';

const router = express.Router();

//User Routes
router.post('/register', createUser);
router.post('/login', loginUser)

export default router;