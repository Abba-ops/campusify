import express from "express";
import {
  isAdmin,
  isAdminOrVendor,
  isLoggedIn,
  isVendor,
} from "../middlewares/authMiddleware.js";
import { createNewOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, isAdmin, getOrders)
  .post(isLoggedIn, createNewOrder);

export default router;
