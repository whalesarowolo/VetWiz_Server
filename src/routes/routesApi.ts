import express from "express";
import { auth } from "./../utils/auth";
import { createUser, loginUser } from "./../controllers/auth.controller";
import { topUpUser, topUpVerify } from "./../controllers/topup.controller";
import {
  sendMessage,
  getUserMessageHistory,
  filterSMSRecipients,
} from "./../controllers/sms.controller";
import {
  addForumPost,
  getAdvertsPosts,
  getCommunityPosts,
  getNewsPosts,
} from "../controllers/forum.controller";
import { updateUserDetails } from "../controllers/user.controller";
import { getWalletBalance } from "../controllers/wallet.controller";

const router = express.Router();

//User Routes
router.post("/register", createUser);
router.post("/login", loginUser);
router.patch("/user/update", <any>auth, updateUserDetails);

//Topup Routes
router.post("/paystack/topup", <any>auth, topUpUser);
router.get("/topup/verify/:reference", topUpVerify);

//SMS route
router.post("/sms/send", <any>auth, sendMessage);
router.get("/sms/history", <any>auth, getUserMessageHistory);
router.post("/sms/filter-recipients", <any>auth, filterSMSRecipients);

//Forum Routes
router.post("/forum/add", <any>auth, addForumPost);
router.get("/forum/get/news", <any>auth, getNewsPosts);
router.get("/forum/get/ads", <any>auth, getAdvertsPosts);
router.get("/forum/get/community", <any>auth, getCommunityPosts);

// Wallet routes
router.get("/wallet/get", <any>auth, getWalletBalance);

export default router;
