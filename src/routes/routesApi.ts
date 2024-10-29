import express from "express";
import fileUpload from "express-fileupload";
import { auth } from "./../utils/auth";
import {
  createUser,
  loginUser,
  updateFullName,
  updatePassword,
  forgotPassword,
  getUserProfile,
  renderResetPassword,
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
  notifyUsersOfAdminPost,
  createForumTopic,
} from "../controllers/forum.controller";

import { addBlogPost, createBlogTopic, getBlogTopics } from "../controllers/blog.controller";
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
// import {
//   createVetShopsFromExcel,
//   getStateVetShopsFromUrl,
//   getMyStateVetShops,
//   getProximityVetShops,
//   createUserFromVetshop,
//   createVetShop,
//   getVetshopsCount,
// } from "../controllers/vet-shop.controller";
import { getDiseaseDiagnosisCount, saveAnimalDiseaseDiagnosis } from "./../controllers/diagnosis.controller";
import { saveEmergency } from "../controllers/emergency.controller";
// import { getVetShops } from "../controllers/vet-shop.controller";
import { saveFeedback } from "../controllers/feedback.controller";
import { saveUserLocationAndAction } from "../controllers/location.controller";
import { getAllUsers } from "../controllers/admin.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.use(fileUpload());

// User Routes
router.post("/register", asyncHandler(createUser));
router.post("/login", asyncHandler(loginUser));
router.get("/user/profile/me", auth as any, asyncHandler(getUserProfile));
router.patch("/user/update", auth as any, asyncHandler(updateUserDetails));
router.patch("/user/update-profile", auth as any, asyncHandler(updateUserProfile));
router.patch("/user/update-name", auth as any, asyncHandler(updateFullName));
router.post("/user/save-user-avatar", auth as any, asyncHandler(updateUserAvatar));
router.patch("/user/reset-password", auth as any, asyncHandler(updatePassword));
router.get("/user/reset-password-view", renderResetPassword);
router.post("/user/forgot-password", forgotPassword);
router.get("/user/get-count", auth as any, asyncHandler(getUsersCount));
router.get("/user/get-role-count", auth as any, asyncHandler(getUserRoleCount)); // ?role=Paravet
// router.post("/user/batch-vets", createNVRIUsers);
// router.post('/user/shops', createUserFromVetshop)

// Topup Routes
// router.post("/paystack/topup", <any>auth, topUpUser);
// router.get("/topup/verify/:reference", topUpVerify);

// SMS route
// router.post("/sms/send-for-approval", <any>auth, sendMessage);
// router.get("/sms/history", <any>auth, getUserMessageHistory);
// router.post("/sms/filter-recipients", <any>auth, filterSMSRecipients);

// Forum Routes
router.post("/forum/add", auth as any, asyncHandler(addForumPost));
router.get("/forum/get/news", auth as any, asyncHandler(getNewsPosts));
router.get("/forum/get/ads", auth as any, asyncHandler(getAdvertsPosts));
router.get("/forum/get/community", auth as any, asyncHandler(getCommunityPosts));
router.post('/forum/notify', auth as any, asyncHandler(notifyUsersOfAdminPost));
router.post("/forum/save-topic-image", auth as any, asyncHandler(saveTopicImage));
router.post("/forum/web/save-topic", auth as any, asyncHandler(createForumTopic));

// Blog routes
router.post("/blog/add", auth as any, asyncHandler(addBlogPost));
router.post("/blog/web/save-blog", auth as any, asyncHandler(createBlogTopic));
// router.get("/blog/get", auth as any, asyncHandler(getBlogTopics));
router.get("/blog/get", asyncHandler(getBlogTopics));

// Articles routes
router.get("/articles/tags", auth as any, asyncHandler(getNews));
router.get("/articles", auth as any, asyncHandler(getArticles));

// Disease routes
// router.post("/diseases/batch", createDiseasesFromJson);
router.get("/diseases", auth as any, asyncHandler(getDiseases));

// Wallet routes
router.get("/wallet/get", auth as any, asyncHandler(getWalletBalance));

// Vet Shops
// router.get("/vet-shops", auth as any, asyncHandler(getVetShops));
// router.post("/vet-shop/create-batch", auth as any, asyncHandler(createVetShopsFromExcel));
// router.get("/vet-shop/my-state-vetshops", auth as any, asyncHandler(getMyStateVetShops));
// router.get("/vet-shop/state-vetshops", auth as any, asyncHandler(getStateVetShopsFromUrl));
// router.get("/vet-shops/proximity", auth as any, asyncHandler(getProximityVetShops));
// router.post("/vet-shops/create", auth as any, asyncHandler(createVetShop));
// router.get("/vet-shops/get-count", auth as any, asyncHandler(getVetshopsCount));

// Diagnosis routes
router.post("/diagnosis/save-results", auth as any, asyncHandler(saveAnimalDiseaseDiagnosis));
router.get("/diagnosis/get-count", auth as any, asyncHandler(getDiseaseDiagnosisCount));

// Emergency routes
router.post("/emergency/save-emergency", auth as any, asyncHandler(saveEmergency));

// Feedback routes
router.post("/feedback/save", auth as any, asyncHandler(saveFeedback));

// Location routes
router.post('/location/save-location', auth as any, asyncHandler(saveUserLocationAndAction));

// Admin routes
router.get("/admin/users", auth as any, asyncHandler(getAllUsers));  // Query = {page: number | undefined; limit: number | undefined}
router.get("/admin/topics", auth as any, asyncHandler(getAllTopics));  // Query = {page: number | undefined; limit: number | undefined}

export default router;