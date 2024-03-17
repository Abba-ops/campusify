import express from "express";
import multer from "multer";
import path from "path";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

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

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
    folder: "campusify",
  });

  res.json({
    success: true,
    image: uploadedImage.secure_url,
    message: "Uploaded successfully",
  });
});

export default router;
