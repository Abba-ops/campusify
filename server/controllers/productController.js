import asyncHandler from "../middlewares/asyncHandler.js";
import { Category, Product } from "../models/productModel.js";
import Vendor from "../models/vendorModel.js";

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 * @access  Public
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
 * @desc    Fetch a single product by ID
 * @route   GET /api/products/:productId
 * @access  Public
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
 * @desc    Create a new review for a product
 * @route   POST /api/products/:productId/reviews
 * @access  Private
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
 * @desc    Delete a review for a product
 * @route   DELETE /api/products/:productId/reviews/:reviewId
 * @access  Private
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

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private
 */
const createProduct = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ user: req.user._id });

  const {
    productName,
    imageUrl,
    productDescription,
    category,
    brand,
    price,
    countInStock,
  } = req.body;

  const product = await Product.create({
    productName,
    productDescription,
    category,
    brand,
    price,
    countInStock,
    imageUrl,
    vendor: vendor._id,
  });

  if (product) {
    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } else {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/**
 * @desc    Update a product by ID
 * @route   PUT /api/products/:productId
 * @access  Private
 */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  const {
    productName,
    imageUrl,
    productDescription,
    category,
    brand,
    price,
    countInStock,
  } = req.body;

  if (product) {
    product.productName = productName;
    product.productDescription = productDescription;
    product.category = category;
    product.brand = brand;
    product.price = price;
    product.countInStock = countInStock;
    product.imageUrl = imageUrl;

    const updatedProduct = await product.save();
    res.json({
      success: true,
      data: updatedProduct,
    });
  } else {
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

const addCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  try {
    const newCategory = await Category.create({ name });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(400);
    next(new Error("Invalid input"));
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

export {
  getProducts,
  getProductById,
  createProductReview,
  deleteReview,
  createProduct,
  updateProduct,
  addCategory,
  deleteCategory,
  getCategories,
};
