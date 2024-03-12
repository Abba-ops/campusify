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
  rejectVendor,
  approveVendor,
} from "../controllers/vendorController.js";

const router = express.Router();

router.route("/").get(isLoggedIn, isAdmin, getVendors);
router.get("/products", isLoggedIn, isVendor, getVendorProducts);
router.route("/:vendorId").get(isLoggedIn, isAdminOrVendor, getVendorById);
router.route("/application").post(isLoggedIn, vendorApplication);
router.put("/approve/:vendorId", approveVendor);
router.put("/reject/:vendorId", rejectVendor);

export default router;
