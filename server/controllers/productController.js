import asyncHandler from "../middleware/asyncHandler.js";
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

export { getProducts, getProductById };
