import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

/**
 * @desc        Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("vendor");

  res.json({
    success: true,
    count: products.length,
    data: products,
  });
});

/**
 * @desc        Fetch a single product by ID
 * @route       GET /api/products/:productId
 * @access      Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId).populate(
    "vendor"
  );

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  res.json({
    success: true,
    data: product,
  });
});

/**
 * @desc        Create a new review for a product
 * @route       POST /api/products/:productId/reviews
 * @access      Private
 */
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, name } = req.body;
  const productId = req.params.productId;
  const userId = req.user._id;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === userId.toString()
  );

  if (alreadyReviewed) {
    res
      .status(400)
      .json({ success: false, message: "Product already reviewed" });
    return;
  }

  const newReview = {
    name,
    rating: Number(rating),
    comment,
    user: userId,
    profilePictureURL: req.user.profilePictureURL,
  };

  product.reviews.push(newReview);

  product.reviewCount = product.reviews.length;

  const totalRating = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  product.rating = totalRating / product.reviews.length;

  await product.save();
  res.status(201).json({ success: true, message: "Review added" });
});

/**
 * @desc        Delete a review for a product
 * @route       DELETE /api/products/:productId/reviews/:reviewId
 * @access      Private
 */
const deleteReview = asyncHandler(async (req, res) => {
  const { productId, reviewId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  product.reviews = product.reviews.filter(
    (review) => !review._id.equals(reviewId)
  );

  product.reviewCount = product.reviews.length;

  const totalRating = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  product.rating =
    product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

  await product.save();

  res
    .status(200)
    .json({ success: true, message: "Review deleted successfully" });
});

export { getProducts, getProductById, createProductReview, deleteReview };
