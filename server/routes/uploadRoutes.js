import express from "express";
import multer from "multer";
import path from "path";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Multer storage configuration for uploading images
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Function to check the file type
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

// Multer upload configuration
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Route for uploading product images
router.post("/products", upload.single("productImage"), async (req, res) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "campusify/products",
    });

    res.json({
      success: true,
      image: uploadedImage.secure_url,
      message: "Product image uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error uploading image" });
  }
});

// Route for uploading vendor logos
router.post("/logos", upload.single("logoImage"), async (req, res) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "campusify/logos",
    });

    res.json({
      success: true,
      image: uploadedImage.secure_url,
      message: "Logo uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error uploading logo" });
  }
});

export default router;
