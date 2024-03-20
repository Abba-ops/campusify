import dotenv from "dotenv";
import colors from "colors";
import userData from "./data/users.js";
import connectDB from "./config/dbConfig.js";
import vendorData from "./data/vendors.js";
import { categoryData, products } from "./data/products.js";
import User from "./models/userModel.js";
import { Category, Product } from "./models/productModel.js";
import cloudinary from "./config/cloudinary.js";
import Vendor from "./models/vendorModel.js";

dotenv.config();
connectDB();

const clearDatabase = async () => {
  await Product.deleteMany();
  await Vendor.deleteMany();
  await User.deleteMany();
  await Category.deleteMany();
};

const linkVendorToUser = (vendors, users) => {
  return vendors.map((vendor) => ({
    ...vendor,
    user: users.find((user) => user.isVendor)?._id || null,
  }));
};

const generateSampleProducts = (vendors, categories) => {
  return products.map((product) => {
    const randomVendorIndex = Math.floor(Math.random() * vendors.length);
    const vendorId = vendors[randomVendorIndex]._id;

    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[randomCategoryIndex];

    const randomSubcategoryIndex = Math.floor(
      Math.random() * category.subcategories.length
    );
    const subcategory = category.subcategories[randomSubcategoryIndex];

    return {
      ...product,
      vendor: vendorId,
      category: category,
      subcategory,
    };
  });
};

const importData = async () => {
  try {
    await clearDatabase();

    const createdUsers = await User.insertMany(userData);
    const createdCategories = await Category.insertMany(categoryData);
    const linkedVendors = linkVendorToUser(vendorData, createdUsers);
    const createdVendors = await Vendor.insertMany(linkedVendors);
    const sampleProducts = generateSampleProducts(
      createdVendors,
      createdCategories
    );

    await Product.insertMany(sampleProducts);

    console.log("Data saved successfully".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error saving data: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await clearDatabase();
    await cloudinary.api.delete_resources_by_prefix("campusify/");

    console.log("Data deleted successfully".red.inverse);
    console.log("Images deleted successfully".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error deleting data: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
