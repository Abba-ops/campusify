import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

/**
 * @desc          Fetch all products
 * @route         GET /api/products
 * @access        Public
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
 * @desc          Fetch a single product by ID
 * @route         GET /api/products/:id
 * @access        Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("vendor");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({
    success: true,
    data: product,
  });
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, name } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      profilePictureURL: req.user.profilePictureURL,
    };

    product.reviews.push(review);

    product.reviewCount = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ success: true, message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById, createProductReview };
