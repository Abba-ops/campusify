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
  deleteVendor,
  getProductsByVendor,
} from "../controllers/vendorController.js";

const router = express.Router();

router.route("/").get(isLoggedIn, isAdmin, getVendors);
router.get("/products", isLoggedIn, isVendor, getVendorProducts);
router
  .route("/:vendorId")
  .get(isLoggedIn, isAdminOrVendor, getVendorById)
  .delete(isLoggedIn, isAdmin, deleteVendor);
router.route("/application").post(isLoggedIn, vendorApplication);
router.put("/:vendorId/:status", isLoggedIn, isAdmin, updateVendorStatus);
router.get("/:vendorId/products", isLoggedIn, isAdmin, getProductsByVendor);

export default router;
