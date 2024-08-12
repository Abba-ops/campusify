import express from "express";
import {
  isAdmin,
  isLoggedIn,
  isVendor,
} from "../middlewares/authMiddleware.js";
import {
  getVendors,
  getVendorById,
  getVendorProducts,
  vendorApplication,
  updateVendorStatus,
  deleteVendor,
  getProductsByVendor,
  getVendorCustomers,
  getAllVendorCustomers,
  getVendorNotifications,
  markNotificationAsRead,
  deleteNotification,
  getUserVendorProduct,
  getVendorProfile,
  getVendorDashboard,
  sendMessage,
  updateVendorProfile,
} from "../controllers/vendorController.js";
import { upload } from "../utilities/index.js";

const router = express.Router();

router.post("/messages", isLoggedIn, isVendor, sendMessage);
router.get("/dashboard", isLoggedIn, isVendor, getVendorDashboard);
router.put(
  "/dashboard/profile",
  isLoggedIn,
  isVendor,
  upload.single("vendorLogo"),
  updateVendorProfile
);
router.get("/profile/:vendorId", getVendorProfile);
router.get("/profile/products/:vendorId", getUserVendorProduct);
router
  .route("/notifications/:notificationId")
  .delete(isLoggedIn, isVendor, deleteNotification);
router.get("/notifications", isLoggedIn, isVendor, getVendorNotifications);
router.put(
  "/notifications/:notificationId/mark-as-read",
  markNotificationAsRead
);

router
  .route("/")
  .get(isLoggedIn, isAdmin, getVendors)
  .post(isLoggedIn, upload.single("vendorLogo"), vendorApplication);

router.get("/products", isLoggedIn, isVendor, getVendorProducts);
router.get("/customers", isLoggedIn, isVendor, getVendorCustomers);
router.get("/all-customers", isLoggedIn, isAdmin, getAllVendorCustomers);
router
  .route("/:vendorId")
  .get(isLoggedIn, getVendorById)
  .delete(isLoggedIn, isAdmin, deleteVendor);
router.put(
  "/:vendorId/status/:status",
  isLoggedIn,
  isAdmin,
  updateVendorStatus
);
router.get("/:vendorId/products", isLoggedIn, isAdmin, getProductsByVendor);

export default router;
