import asyncHandler from "../middlewares/asyncHandler.js";
import genToken from "../utils/genToken.js";
import User from "../models/userModel.js";
import axios from "axios";
import Vendor from "../models/vendorModel.js";

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
    throw new Error("Invalid email or password");
  }

  const vendor = await Vendor.findOne({ user: user._id });
  const userData = {
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

  genToken(res, user._id);
  res.status(200).json({
    success: true,
    data: userData,
    message: "Login successful. Welcome!",
  });
});

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { uniqueId, userType, password } = req.body;

  const portalRes = await axios.post(process.env.PORTAL_ENDPOINT, {
    uniqueId,
    role: userType,
    api_key: process.env.PORTAL_API_KEY,
  });

  const { data } = portalRes;
  const { lastname, othernames, image, email, phone_number } = data.data;

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("User already exists.");
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

  const userData = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    isVendor: user.isVendor,
    userType: user.userType,
    lastName: user.lastName,
    otherNames: user.otherNames,
    phoneNumber: user.phoneNumber,
    profilePictureURL: user.profilePictureURL,
  };

  genToken(res, user._id);

  res.status(201).json({
    success: true,
    data: userData,
    message: "Account created successfully!",
  });
});

/**
 * @desc    Logout user
 * @route   POST /api/users/logout
 * @access  Public
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt_token");
  res
    .status(200)
    .json({ success: true, message: "Logout successful. Goodbye!" });
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile/:userId
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const userData = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    isVendor: user.isVendor,
    userType: user.userType,
    lastName: user.lastName,
    otherNames: user.otherNames,
    phoneNumber: user.phoneNumber,
    profilePictureURL: user.profilePictureURL,
  };

  res.status(200).json({
    success: true,
    data: userData,
    message: "User found. Welcome!",
  });
});

/**
 * @desc     Update user password
 * @route    PUT /api/users/update-password
 * @access   Private
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
    .json({ success: true, message: "Password updated successfully" });
});

/**
 * @desc     Delete user account
 * @route    DELETE /api/users/delete-account
 * @access   Private
 */
const deleteMyAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await User.deleteOne({ _id: req.user._id });
  res.clearCookie("jwt_token");
  res
    .status(200)
    .json({ success: true, message: "Account deleted successfully" });
});

/**
 * @desc       Get all users
 * @route      GET /api/users
 * @access     Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

/**
 * @desc     Delete a user
 * @route    DELETE /api/users/:userId
 * @access   Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.deleteOne();
  res.status(200).json({ success: true, message: "User deleted successfully" });
});

/**
 * @desc     Get a user by ID
 * @route    GET /api/users/:userId
 * @access   Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ success: true, data: user });
});

/**
 * @desc    Get current user
 * @route   GET /api/users/current
 * @access  Private
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const vendor = await Vendor.findOne({ user: user._id });
    const userData = {
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

    res.status(200).json({
      success: true,
      data: userData,
      message: "Current user retrieved successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

export {
  authUser,
  getUsers,
  deleteUser,
  logoutUser,
  getUserById,
  registerUser,
  getUserProfile,
  deleteMyAccount,
  updateUserPassword,
  getCurrentUser,
};
