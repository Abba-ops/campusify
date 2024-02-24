import {
  createProductReview,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { validateReview } from "../middlewares/validation.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

router
  .route("/:id/reviews")
  .post(isLoggedIn, validateReview, createProductReview);

export default router;
