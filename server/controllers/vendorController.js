import asyncHandler from "../middlewares/asyncHandler.js";
import Vendor from "../models/vendorModel.js";
import Product from "../models/productModel.js";

/**
 * @desc       Get all vendors
 * @route      GET /api/vendors
 * @access     Private/Admin
 */
const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({}).populate("user");

  res.status(200).json({
    success: true,
    count: vendors.length,
    data: vendors,
  });
});

/**
 * @desc       Get a vendor by ID
 * @route      GET /api/vendors/:id
 * @access     Private/Admin
 */
const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.vendorId);

  if (!vendor) {
    return res
      .status(404)
      .json({ success: false, message: "Vendor not found" });
  }

  res.status(200).json({ success: true, data: vendor });
});

const getVendorProducts = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ user: req.user._id });
  const vendorProducts = await Product.find({ vendor: vendor._id });
  res.status(200).json({ success: true, data: vendorProducts });
});

export { getVendors, getVendorById, getVendorProducts };
