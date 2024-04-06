import express from "express";
import {
  isAdmin,
  isAdminOrVendor,
  isLoggedIn,
  isVendor,
} from "../middlewares/authMiddleware.js";
import {
  createNewOrder,
  getMyOrders,
  getOrderById,
  getOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, isAdmin, getOrders)
  .post(isLoggedIn, createNewOrder);

router.get("/mine", isLoggedIn, getMyOrders);
router.route("/:orderId").get(isLoggedIn, getOrderById);

export default router;
