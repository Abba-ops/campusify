import asyncHandler from "../middlewares/asyncHandler.js";
import genToken from "../utils/genToken.js";
import User from "../models/userModel.js";
import axios from "axios";
import Vendor from "../models/vendorModel.js";
import { Product } from "../models/productModel.js";
import { extractPublicId } from "./productController.js";
import cloudinary from "../config/cloudinary.js";

const deleteProductsAndVendor = async (userId) => {
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

const constructUserData = (user, vendor = null) => {
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
 * @desc    Authenticate user
 * @route   POST /api/users/auth
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Incorrect email or password");
  }

  const vendor = await Vendor.findOne({ user: user._id });

  const { otherNames } = user;
  const firstName = otherNames.split(" ")[0];

  genToken(res, user._id);

  res.status(200).json({
    success: true,
    data: constructUserData(user, vendor),
    message: `Welcome, ${firstName}! Login successful`,
  });
});

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { uniqueId, userType, password } = req.body;

  try {
    const portalRes = await axios.post(process.env.PORTAL_ENDPOINT, {
      uniqueId,
      role: userType,
      api_key: process.env.PORTAL_API_KEY,
    });

    const { data } = portalRes;
    const { lastname, othernames, image, email, phone_number } = data.data;

    if (await User.findOne({ email })) {
      res.status(400);
      throw new Error("Email already taken");
    }

    const user = await User.create({
      email,
      password,
      userType,
      lastName: lastname,
      otherNames: othernames,
      profilePictureURL: image,
      phoneNumber: phone_number,
    });

    const firstName = othernames.split(" ")[0];

    genToken(res, user._id);

    res.status(201).json({
      success: true,
      data: constructUserData(user),
      message: `Welcome, ${firstName}! Account created!`,
    });
  } catch (error) {
    let errorMessage = "Registration failed. Please try again.";

    if (error.response && error.response.status === 400) {
      errorMessage = "Invalid information provided.";
    } else if (error.message.includes("Email already taken")) {
      errorMessage = "Email already in use.";
    }

    res.status(400);
    throw new Error(errorMessage);
  }
});

/**
 * @desc    Logout user
 * @route   POST /api/users/logout
 * @access  Public
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt_token");
  res.status(200).json({ success: true, message: "Logged out. Goodbye!" });
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile/:userId
 * @access  Public
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    data: constructUserData(user),
    message: "User found. Welcome!",
  });
});

/**
 * @desc    Update user password
 * @route   PUT /api/users/update-password
 * @access  Private
 */
const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error("Password required");
  }

  user.password = password;

  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password successfully updated." });
});

/**
 * @desc    Delete user account
 * @route   DELETE /api/users/delete-account
 * @access  Private
 */
const deleteMyAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await deleteProductsAndVendor(req.user._id);
  await User.deleteOne({ _id: req.user._id });

  res.clearCookie("jwt_token");
  res.status(200).json({
    success: true,
    message: "Your account has been successfully deleted.",
  });
});

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to retrieve users. Please try again later.");
  }
});

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:userId
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  await deleteProductsAndVendor(user._id);
  await user.deleteOne();

  res
    .status(200)
    .json({ success: true, message: "User has been successfully deleted." });
});

/**
 * @desc    Get a user by ID
 * @route   GET /api/users/:userId
 * @access  Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.status(200).json({ success: true, data: user, message: "User found." });
});

/**
 * @desc    Get current user
 * @route   GET /api/users/current
 * @access  Private
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found. Please log in again.");
  }

  const vendor = await Vendor.findOne({ user: user._id });

  res.status(200).json({
    success: true,
    data: constructUserData(user, vendor),
    message: "User retrieved successfully.",
  });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserPassword,
  deleteMyAccount,
  getUsers,
  deleteUser,
  getUserById,
  getCurrentUser,
};
