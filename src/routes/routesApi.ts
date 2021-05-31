import express from "express";
import fileUpload from "express-fileupload";
import multer from 'multer'
import { auth } from "./../utils/auth";
import {
  createUser,
  loginUser,
  updateFullName,
  updatePassword,
  forgotPassword,
  getUserProfile,
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
  getAllTopics,
  getCommunityPosts,
  getNewsPosts,
  saveTopicImage,
} from "../controllers/forum.controller";
import {
  updateUserDetails,
  updateUserProfile,
  updateUserAvatar,
  getUserRoleCount,
  getUsersCount,
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
  createUserFromVetshop,
  createVetShop,
  getVetshopsCount,
} from "../controllers/vet-shop.controller";
import { getDiseaseDiagnosisCount, saveAnimalDiseaseDiagnosis } from "./../controllers/diagnosis.controller";
import { saveEmergency } from "../controllers/emergency.controller";
import { getVetShops } from "../controllers/vet-shop.controller";
import { saveFeedback } from "../controllers/feedback.controller";
import { saveUserLocationAndAction } from "../controllers/location.controller";
import { getAllUsers } from "../controllers/admin.controller";

const router = express.Router();

router.use(fileUpload());

//User Routes
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/user/profile/me", <any>auth, getUserProfile)
router.patch("/user/update", <any>auth, updateUserDetails);
router.patch("/user/update-profile", <any>auth, updateUserProfile);
router.patch("/user/update-name", <any>auth, updateFullName);
router.post("/user/save-user-avatar", <any>auth, updateUserAvatar);
router.patch("/user/reset-password", <any>auth, updatePassword);
router.post("/user/forgot-password", forgotPassword);
router.get("/user/get-count", <any>auth, getUsersCount);
router.get("/user/get-role-count", <any>auth, getUserRoleCount); // ?role=Paravet
// router.post("/user/batch-vets", createNVRIUsers);
// router.post('/user/shops', createUserFromVetshop)

//Topup Routes
// router.post("/paystack/topup", <any>auth, topUpUser);
// router.get("/topup/verify/:reference", topUpVerify);

//SMS route
// router.post("/sms/send-for-approval", <any>auth, sendMessage);
// router.get("/sms/history", <any>auth, getUserMessageHistory);
// router.post("/sms/filter-recipients", <any>auth, filterSMSRecipients);

//Forum Routes
router.post("/forum/add", <any>auth, addForumPost);
router.get("/forum/get/news", <any>auth, getNewsPosts);
router.get("/forum/get/ads", <any>auth, getAdvertsPosts);
router.get("/forum/get/community", <any>auth, getCommunityPosts);
router.post("/forum/save-topic-image", <any>auth, saveTopicImage)

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
router.post("/vet-shops/create", <any>auth, createVetShop)
router.get("/vet-shops/get-count", <any>auth, getVetshopsCount);

// Diagnosis routes
router.post("/diagnosis/save-results", <any>auth, saveAnimalDiseaseDiagnosis);
router.get("/diagnosis/get-count", <any>auth, getDiseaseDiagnosisCount);

// Emergency routes
router.post("/emergency/save-emergency", <any>auth, saveEmergency);

// Feedback routes
router.post("/feedback/save", <any>auth, saveFeedback);

// Location routes
router.post('/location/save-location', <any>auth, saveUserLocationAndAction)

// Admin routes
router.get("/admin/users", <any>auth, getAllUsers)  // Query = {page: number | undefined; limit: number | undefined}
router.get("/admin/topics", <any>auth, getAllTopics)  // Query = {page: number | undefined; limit: number | undefined}

export default router;
