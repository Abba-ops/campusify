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
  getVendorsBySaleCount,
  getVendorNotifications,
  markNotificationAsRead,
  deleteNotification,
  getUserVendorProduct,
  getVendorProfile,
} from "../controllers/vendorController.js";

const router = express.Router();

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
router.route("/").get(isLoggedIn, isAdmin, getVendors);
router.get("/sales/count", getVendorsBySaleCount);
router.get("/products", isLoggedIn, isVendor, getVendorProducts);
router.get("/customers", isLoggedIn, isVendor, getVendorCustomers);
router.get("/customers/all", isLoggedIn, isAdmin, getAllVendorCustomers);
router.route("/application").post(isLoggedIn, vendorApplication);
router
  .route("/:vendorId")
  .get(isLoggedIn, getVendorById)
  .delete(isLoggedIn, isAdmin, deleteVendor);
router.put("/:vendorId/:status", isLoggedIn, isAdmin, updateVendorStatus);
router.get("/:vendorId/products", isLoggedIn, isAdmin, getProductsByVendor);

export default router;
