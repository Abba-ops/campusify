import asyncHandler from "../middlewares/asyncHandler.js";
import genToken from "../utils/genToken.js";
import User from "../models/userModel.js";
import axios from "axios";

/**
 * @desc    Authenticate user
 * @route   POST /api/users/auth
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
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
      res.status(200).json({
        success: true,
        data: userData,
        message: "Login successful. Welcome!",
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
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

    const userExists = await User.findOne({ email });

    if (userExists) {
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
  } catch (error) {
    let errorMessage = "Invalid request.";

    if (error.response && error.response.status === 400) {
      errorMessage = "Invalid data provided to external portal.";
    } else if (error.message.includes("User already exists")) {
      errorMessage = "User already exists.";
    }

    res.status(400).json({ success: false, message: errorMessage });
  }
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

  if (req.body.password) {
    user.password = req.body.password;

    try {
      await user.save();
      res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      res.status(500);
      throw new Error("Internal Server Error");
    }
  } else {
    res.status(400);
    throw new Error("Password required");
  }
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

  try {
    await User.deleteOne({ _id: req.user._id });
    res.clearCookie("jwt_token");
    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
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
    return res.status(404).json({ success: false, message: "User not found" });
  }

  await user.deleteOne();

  return res
    .status(200)
    .json({ success: true, message: "User deleted successfully" });
});

/**
 * @desc     Get a user by ID
 * @route    GET /api/users/:userId
 * @access   Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  res.status(200).json({ success: true, data: user });
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
};
