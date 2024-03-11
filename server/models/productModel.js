import { Schema, model } from "mongoose";

export const reviewSchema = new Schema(
  {
    profilePictureURL: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    reviewCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Vendor",
    },
  },
  { timestamps: true }
);

const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
    lowercase: true,
  },
});

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
    lowercase: true,
  },
  subcategories: [subcategorySchema],
});

export const Product = model("Product", productSchema);
export const Category = model("Category", categorySchema);
export const Subcategory = model("Subcategory", categorySchema);
