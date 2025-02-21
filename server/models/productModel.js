import { Schema, model } from "mongoose";

const subcategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  subcategories: [subcategorySchema],
});

const reviewSchema = new Schema(
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
    subcategory: subcategorySchema,
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
    isFeatured: {
      type: Boolean,
      default: false,
    },
    salesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export const Category = model("Category", categorySchema);

export default Product;
