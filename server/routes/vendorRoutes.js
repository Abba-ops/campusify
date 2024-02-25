import express from "express";
import { isLoggedIn, isVendor } from "../middlewares/authMiddleware.js";
import { getVendors, getVendorById } from "../controllers/vendorController.js";

const router = express.Router();

router.route("/").get(isLoggedIn, isVendor, getVendors);
router.route("/:vendorId").get(isLoggedIn, isVendor, getVendorById);

export default router;
