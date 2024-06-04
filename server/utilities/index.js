import cloudinary from "../config/cloudinary.js";
import { Product } from "../models/productModel.js";
import Vendor from "../models/vendorModel.js";
import jwt from "jsonwebtoken";

/**
 * Generates a JWT token and sets it as a cookie in the response.
 * @param {object} res - Express response object.
 * @param {string} userId - User ID to be included in the token payload.
 */
export function genToken(res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt_token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development",
  });
}

/**
 * Generates an order ID.
 * @returns {string} - The generated order ID.
 */
export const generateOrderID = () => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substr(2, 5);
  return timestamp + randomString;
};

/**
 * Calculates order prices.
 * @param {object} order - The order object.
 * @returns {object} - The updated order object with prices calculated.
 */
export const calculateOrderPrices = (order) => {
  order.orderItems = order.orderItems.filter(
    (orderItem) => orderItem.product !== null
  );
  const itemPrice = order.orderItems.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );
  order.itemsPrice = itemPrice;
  order.totalPrice = itemPrice + order.taxPrice;
  return order;
};

/**
 * Extracts public ID from a URL.
 * @param {string} url - The URL.
 * @returns {string} - The extracted public ID.
 */
export const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileName = parts.pop().split(".")[0];
  const publicId = parts.pop() + "/" + fileName;
  return publicId;
};

/**
 * Deletes products and vendor associated with a user.
 * @param {string} userId - The user ID.
 */
export const deleteProductsAndVendor = async (userId) => {
  const vendor = await Vendor.findOne({ user: userId });

  if (vendor) {
    const products = await Product.find({ vendor: vendor._id });

    for (const product of products) {
      const publicId = extractPublicId(product.imageUrl);
      await cloudinary.uploader.destroy(`campusify/${publicId}`);
      await product.deleteOne();
    }

    await vendor.deleteOne();
  }
};

/**
 * Constructs user data object.
 * @param {object} user - The user object.
 * @param {object} vendor - The vendor object.
 * @returns {object} - The constructed user data object.
 */
export const constructUserData = (user, vendor = null) => {
  return {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    isVendor: user.isVendor,
    userType: user.userType,
    lastName: user.lastName,
    otherNames: user.otherNames,
    phoneNumber: user.phoneNumber,
    profilePictureURL: user.profilePictureURL,
    vendor,
  };
};

/**
 * Wrapper function to handle asynchronous functions.
 * @param {function} fn - The asynchronous function.
 * @returns {function} - Middleware function.
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Checks if the file type is allowed.
 * @param {object} file - The file object.
 * @param {function} cb - The callback function.
 */
export const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
};
