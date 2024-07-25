import express from "express";
import {
  addCategory,
  addSubcategory,
  createProduct,
  createProductReview,
  deleteCategory,
  deleteProduct,
  deleteReview,
  deleteSubcategory,
  getBestSellingProducts,
  getCategories,
  getIsFeatured,
  getPopularProducts,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsBySubcategory,
  searchProducts,
  updateProduct,
} from "../controllers/productController.js";
import {
  isAdmin,
  isAdminOrVendor,
  isLoggedIn,
  isVendor,
} from "../middlewares/authMiddleware.js";
import { validateReview } from "../middlewares/validateData.js";
import { upload } from "../utilities/index.js";

const router = express.Router();

router.get("/search", searchProducts);
router.get("/popular", getPopularProducts);
router.get("/best-sellers", getBestSellingProducts);
router.get("/featured", getIsFeatured);
router.get(
  "/subcategory/:subcategory/:subcategoryId",
  getProductsBySubcategory
);
router.get("/category/:category/:categoryId", getProductsByCategory);

router
  .route("/")
  .get(isLoggedIn, isAdmin, getProducts)
  .post(isLoggedIn, isVendor, upload.single("productImage"), createProduct);

router
  .route("/categories")
  .get(getCategories)
  .post(isLoggedIn, isAdmin, addCategory);

router
  .route("/:productId")
  .get(getProductById)
  .put(isLoggedIn, isAdminOrVendor, upload.single("image"), updateProduct)
  .delete(isLoggedIn, isAdminOrVendor, deleteProduct);

router
  .route("/:productId/reviews")
  .post(isLoggedIn, validateReview, createProductReview);

router.delete("/:productId/reviews/:reviewId", isLoggedIn, deleteReview);
router.delete("/categories/:categoryId", isLoggedIn, isAdmin, deleteCategory);
router.post("/subcategory", isLoggedIn, isAdmin, addSubcategory);
router.delete(
  "/subcategory/:categoryId/:subcategoryId",
  isLoggedIn,
  isAdmin,
  deleteSubcategory
);

export default router;
