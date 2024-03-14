import express from "express";
import {
  isAdmin,
  isAdminOrVendor,
  isLoggedIn,
  isVendor,
} from "../middlewares/authMiddleware.js";
import {
  getVendors,
  getVendorById,
  getVendorProducts,
  vendorApplication,
  updateVendorStatus,
} from "../controllers/vendorController.js";

const router = express.Router();

router.route("/").get(isLoggedIn, isAdmin, getVendors);
router.get("/products", isLoggedIn, isVendor, getVendorProducts);
router.route("/:vendorId").get(isLoggedIn, isAdminOrVendor, getVendorById);
router.route("/application").post(isLoggedIn, vendorApplication);
router.put("/:vendorId/:status", isLoggedIn, isAdmin, updateVendorStatus);

export default router;
