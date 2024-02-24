import express from "express";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
import { getVendors, getVendorById } from "../controllers/vendorController.js";

const router = express.Router();

router.route("/").get(isLoggedIn, isAdmin, getVendors);
router.route("/:id").get(isLoggedIn, isAdmin, getVendorById);

export default router;
