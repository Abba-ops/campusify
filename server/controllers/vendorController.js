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
  const vendor = await Vendor.findById(req.params.vendorId).populate("user");

  if (!vendor) {
    return res
      .status(404)
      .json({ success: false, message: "Vendor not found" });
  }

  res.status(200).json({ success: true, data: vendor });
});

/**
 * @desc       Get products of a specific vendor
 * @route      GET /api/vendors/products
 * @access     Private
 */
const getVendorProducts = asyncHandler(async (req, res) => {
  const vendorProducts = await Product.find({ vendor: req.vendor._id });
  res.status(200).json({ success: true, data: vendorProducts });
});

const vendorApplication = asyncHandler(async (req, res) => {
  const { businessEmail, businessName, businessPhone, businessDescription } =
    req.body;

  const newVendorData = {
    businessName,
    businessDescription,
    user: req.user._id,
    businessEmail,
    businessPhone,
  };

  const createdVendor = await Vendor.create(newVendorData);

  res.status(201).json({ success: true, data: createdVendor });
});

export { getVendors, getVendorById, getVendorProducts, vendorApplication };
