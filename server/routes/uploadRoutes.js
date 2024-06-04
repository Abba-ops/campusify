import { checkFileType } from "../utilities/index.js";
import cloudinary from "../config/cloudinary.js";
import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const uploadToCloudinary = async (req, res, folderName) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: `campusify/${folderName}`,
    });

    res.json({
      success: true,
      image: uploadedImage.secure_url,
      message: `${folderName} uploaded successfully`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Error uploading ${folderName}` });
  }
};

/**
 * @desc    Upload a product image
 * @route   POST /api/products
 * @access  Private
 */
router.post("/products", upload.single("productImage"), async (req, res) => {
  await uploadToCloudinary(req, res, "products");
});

/**
 * @desc    Upload a logo image
 * @route   POST /api/logos
 * @access  Private
 */
router.post("/logos", upload.single("logoImage"), async (req, res) => {
  await uploadToCloudinary(req, res, "logos");
});

export default router;
