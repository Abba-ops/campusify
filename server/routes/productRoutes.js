import {
  createProductReview,
  deleteReview,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { validateReview } from "../middlewares/validation.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:productId").get(getProductById);

router
  .route("/:productId/reviews")
  .post(isLoggedIn, validateReview, createProductReview);

router.delete("/:productId/reviews/:reviewId", isLoggedIn, deleteReview);

export default router;
