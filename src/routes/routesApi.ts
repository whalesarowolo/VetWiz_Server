import express from "express";
import fileUpload from "express-fileupload";
import { auth } from "./../utils/auth";
import {
  createUser,
  loginUser,
  updateFullName,
  updatePassword,
  forgotPassword,
} from "./../controllers/auth.controller";
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
import {
  updateUserDetails,
  updateUserProfile,
  updateUserAvatar,
} from "../controllers/user.controller";
import { getWalletBalance } from "../controllers/wallet.controller";
import { getArticles, getNews } from "../controllers/article.controller";
import {
  getDiseases,
  // createDiseasesFromJson,
} from "../controllers/disease.controller";
import {
  createVetShopsFromExcel,
  getStateVetShopsFromUrl,
  getMyStateVetShops,
  getProximityVetShops,
} from "../controllers/vet-shop.controller";
import { saveAnimalDiseaseDiagnosis } from "./../controllers/diagnosis.controller";
import { saveEmergency } from "../controllers/emergency.controller";
import { getVetShops } from "../controllers/vet-shop.controller";
import { saveFeedback } from "../controllers/feedback.controller";

const router = express.Router();

router.use(fileUpload({ safeFileNames: true }));

//User Routes
router.post("/register", createUser);
router.post("/login", loginUser);
router.patch("/user/update", <any>auth, updateUserDetails);
router.patch("/user/update-profile", <any>auth, updateUserProfile);
router.patch("/user/update-name", <any>auth, updateFullName);
router.post("/user/save-user-avatar", <any>auth, updateUserAvatar);
router.patch("/user/reset-password", <any>auth, updatePassword);
router.post("/user/forgot-password", forgotPassword);
// router.post("/user/batch-vets", createNVRIUsers);

//Topup Routes
router.post("/paystack/topup", <any>auth, topUpUser);
router.get("/topup/verify/:reference", topUpVerify);

//SMS route
router.post("/sms/send-for-approval", <any>auth, sendMessage);
router.get("/sms/history", <any>auth, getUserMessageHistory);
router.post("/sms/filter-recipients", <any>auth, filterSMSRecipients);

//Forum Routes
router.post("/forum/add", <any>auth, addForumPost);
router.get("/forum/get/news", <any>auth, getNewsPosts);
router.get("/forum/get/ads", <any>auth, getAdvertsPosts);
router.get("/forum/get/community", <any>auth, getCommunityPosts);

//Articles routes
router.get("/articles/tags", <any>auth, getNews);
router.get("/articles", <any>auth, getArticles);

//Disease routes
// router.post("/diseases/batch", createDiseasesFromJson);
router.get("/diseases", <any>auth, getDiseases);

// Wallet routes
router.get("/wallet/get", <any>auth, getWalletBalance);

// Vet Shops
router.get("/vet-shops", <any>auth, getVetShops);
router.post("/vet-shop/create-batch", <any>auth, createVetShopsFromExcel);
router.get("/vet-shop/my-state-vetshops", <any>auth, getMyStateVetShops);
router.get("/vet-shop/state-vetshops", <any>auth, getStateVetShopsFromUrl);
router.get("/vet-shops/proximity", <any>auth, getProximityVetShops);

// Diagnosis routes
router.post("/diagnosis/save-results", <any>auth, saveAnimalDiseaseDiagnosis);

// Emergency routes
router.post("/emergency/save-emergency", <any>auth, saveEmergency);

// Feedback routes
router.post("/feedback/save", <any>auth, saveFeedback);

export default router;
