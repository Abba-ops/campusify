import asyncHandler from "../middlewares/asyncHandler.js";
import { Category, Product } from "../models/productModel.js";
import Vendor from "../models/vendorModel.js";

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("vendor").populate("category");

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
  const product = await Product.findById(req.params.productId)
    .populate("vendor")
    .populate("category");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
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
    res.status(404);
    throw new Error("Product not found");
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === userId.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
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
    res.status(404);
    throw new Error("Product not found");
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
    subcategory,
  } = req.body;

  const product = await Product.create({
    productName,
    productDescription,
    category,
    brand,
    price,
    countInStock,
    imageUrl,
    subcategory,
    vendor: vendor._id,
  });

  if (!product) {
    res.status(500);
    throw new Error("Internal Server Error");
  }

  res.status(201).json({
    success: true,
    data: product,
    message: "Product created successfully",
  });
});

/**
 * @desc    Update a product by ID
 * @route   PUT /api/products/:productId
 * @access  Private
 */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const {
    productName,
    imageUrl,
    productDescription,
    category,
    brand,
    price,
    countInStock,
    subcategory,
  } = req.body;

  product.productName = productName;
  product.productDescription = productDescription;
  product.category = category;
  product.brand = brand;
  product.price = price;
  product.countInStock = countInStock;
  product.imageUrl = imageUrl;
  product.subcategory = subcategory;

  const updatedProduct = await product.save();

  res.json({
    success: true,
    data: updatedProduct,
  });
});

/**
 * @desc    Add a new category
 * @route   POST /api/products/categories
 * @access  Private
 */
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newCategory = await Category.create({ name });

  if (!newCategory) {
    res.status(500);
    throw new Error("Internal Server Error");
  }

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: newCategory,
  });
});

/**
 * @desc    Get all categories
 * @route   GET /api/products/categories
 * @access  Public
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json({
    success: true,
    data: categories,
  });
});

/**
 * @desc    Delete a category by ID
 * @route   DELETE /api/products/categories/:categoryId
 * @access  Private
 */
const deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.categoryId);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

/**
 * @desc    Get products by category
 * @route   GET /api/products/categories/:category/:categoryId
 * @access  Public
 */
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  try {
    const products = await Product.find({ category: categoryId });

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

/**
 * @desc    Get products by subcategory
 * @route   GET /api/products/subcategory/:subcategory/:subcategoryId
 * @access  Public
 */
const getProductsBySubcategory = asyncHandler(async (req, res) => {
  const { subcategoryId } = req.params;

  try {
    const products = await Product.find({
      "subcategory._id": subcategoryId,
    });

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

/**
 * @desc    Search products
 * @route   GET /api/products/search
 * @access  Public
 */
const searchProducts = asyncHandler(async (req, res) => {
  const { query } = req.query;

  try {
    const products = await Product.find({
      $or: [
        { productName: { $regex: new RegExp(query, "i") } },
        { description: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.json({ success: true, data: products });
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
  getCategories,
  deleteCategory,
  getProductsByCategory,
  getProductsBySubcategory,
  searchProducts,
};
