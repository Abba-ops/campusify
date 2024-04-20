import asyncHandler from "../middlewares/asyncHandler.js";
import { Category, Product } from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";
import Vendor from "../models/vendorModel.js";

export const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileName = parts.pop().split(".")[0];
  const publicId = parts.pop() + "/" + fileName;
  return publicId;
};

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 * @access  Private/Admin
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate("vendor category");

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
    "vendor category"
  );

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
    throw new Error("Product not found.");
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === userId.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Review already submitted.");
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
  res.status(201).json({
    success: true,
    message: "Review added successfully.",
  });
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
    throw new Error("Product not found.");
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
    .json({ success: true, message: "Review successfully deleted." });
});

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Vendor
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
    brand,
    category,
    countInStock: Number(countInStock),
    imageUrl,
    productDescription,
    price: Number(price),
    productName,
    vendor: vendor._id,
    subcategory,
  });

  if (!product) {
    res.status(500);
    throw new Error("Failed to create product.");
  }

  res.status(201).json({
    success: true,
    data: product,
    message: "Product successfully created.",
  });
});

/**
 * @desc    Update a product by ID
 * @route   PUT /api/products/:productId
 * @access  Private/Vendor|Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
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

  if (imageUrl !== product.imageUrl) {
    const publicId = extractPublicId(product.imageUrl);
    await cloudinary.uploader.destroy(publicId);
  }

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
    message: "Product successfully updated.",
  });
});

/**
 * @desc    Add a new category
 * @route   POST /api/products/categories
 * @access  Private/Admin
 */
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newCategory = await Category.create({ name });

  if (!newCategory) {
    res.status(500);
    throw new Error("Failed to create category.");
  }

  res.status(201).json({
    success: true,
    message: "Category created successfully.",
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
  const products = await Product.find({ category: req.params.categoryId });

  if (products.length > 0) {
    res.status(400);
    throw new Error(
      "Change the category of associated products before deleting."
    );
  }

  await Category.findByIdAndDelete(req.params.categoryId);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully.",
  });
});

/**
 * @desc    Get products by category
 * @route   GET /api/products/categories/:category/:categoryId
 * @access  Public
 */
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const products = await Product.find({ category: categoryId });

  res.json({ success: true, data: products });
});

/**
 * @desc    Get products by subcategory
 * @route   GET /api/products/subcategory/:subcategory/:subcategoryId
 * @access  Public
 */
const getProductsBySubcategory = asyncHandler(async (req, res) => {
  const { subcategoryId } = req.params;

  const products = await Product.find({
    "subcategory._id": subcategoryId,
  });

  res.json({ success: true, data: products });
});

/**
 * @desc    Search products
 * @route   GET /api/products/search
 * @access  Public
 */
const searchProducts = asyncHandler(async (req, res) => {
  const { query } = req.query;

  const products = await Product.find({
    $or: [
      { productName: { $regex: new RegExp(query, "i") } },
      { description: { $regex: new RegExp(query, "i") } },
    ],
  });

  res.json({ success: true, data: products });
});

/**
 * @desc    Add a subcategory to a category
 * @route   POST /api/products/subcategory/add
 * @access  Private/Admin
 */
const addSubcategory = asyncHandler(async (req, res) => {
  const { name, parentCategory } = req.body;

  if (!name || !parentCategory) {
    res.status(400);
    throw new Error("Name and parent category are required");
  }

  const category = await Category.findById(parentCategory);

  if (!category) {
    res.status(404);
    throw new Error("Parent category not found");
  }

  category.subcategories.push({ name });

  await category.save();

  res.status(201).json({
    success: true,
    message: "Subcategory added successfully",
    category,
  });
});

/**
 * @desc    Delete a subcategory from a category
 * @route   DELETE /api/products/subcategory/delete/:categoryId/:subcategoryId
 * @access  Private/Admin
 */
const deleteSubcategory = asyncHandler(async (req, res) => {
  const { categoryId, subcategoryId } = req.params;

  const products = await Product.find({ "subcategory._id": subcategoryId });

  if (products.length > 0) {
    res.status(400);
    throw new Error(
      "Please reassign or remove associated products before deleting the subcategory."
    );
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  category.subcategories = category.subcategories.filter(
    (sub) => sub._id.toString() !== subcategoryId
  );

  await category.save();

  res
    .status(200)
    .json({ success: true, message: "Subcategory deleted successfully" });
});

/**
 * @desc    Fetch featured products
 * @route   GET /api/products/featured
 * @access  Public
 */
const getIsFeatured = asyncHandler(async (req, res) => {
  const featuredProducts = await Product.aggregate([
    { $match: { isFeatured: true } },
    { $sample: { size: 10 } },
  ]);

  if (featuredProducts.length > 0) {
    res.status(200).json({ success: true, data: featuredProducts });
  } else {
    res.status(404);
    throw new Error("No featured products found");
  }
});

/**
 * @desc    Fetch popular products
 * @route   GET /api/products/popular
 * @access  Public
 */
const getPopularProducts = asyncHandler(async (req, res) => {
  const popularProductsByRatings = await Product.aggregate([
    { $match: { rating: { $gt: 4 } } },
    { $sample: { size: 10 } },
  ]);

  if (popularProductsByRatings.length > 0) {
    res.status(200).json({ success: true, data: popularProductsByRatings });
  } else {
    res.status(404);
    throw new Error("No popular products found based on ratings");
  }
});

/**
 * @desc    Fetch best-selling products
 * @route   GET /api/products/sellers/best
 * @access  Public
 */
const getBestSellingProducts = asyncHandler(async (req, res) => {
  const bestSellingProducts = await Product.aggregate([
    { $sort: { salesCount: -1 } },
    { $sample: { size: 10 } },
  ]);

  if (bestSellingProducts.length > 0) {
    res.status(200).json({ success: true, data: bestSellingProducts });
  } else {
    res.status(404);
    throw new Error("No best-selling products found");
  }
});

/**
 * @desc    Delete a product and its associated image from Cloudinary
 * @route   DELETE /api/products/:productId
 * @access  Private/Vendor|Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const publicId = extractPublicId(product.imageUrl);
    await cloudinary.uploader.destroy(`campusify/${publicId}`);

    await Product.findByIdAndDelete(productId);

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
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
  addSubcategory,
  deleteSubcategory,
  getIsFeatured,
  getPopularProducts,
  getBestSellingProducts,
  deleteProduct,
};
