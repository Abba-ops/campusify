import dotenv from "dotenv";
import colors from "colors";
import userData from "./data/users.js";
import connectDB from "./config/dbConfig.js";
import vendorData from "./data/vendors.js";
import User from "./models/userModel.js";
import products, { categories } from "./data/products.js";
import Vendor from "./models/vendorModel.js";
import { Category, Product } from "./models/productModel.js";

dotenv.config();
connectDB();

/**
 * Import data into the database.
 */
const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await Vendor.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});

    // Insert user data
    const createdUsers = await User.insertMany(userData);

    await Category.insertMany(categories);

    // Insert vendor data, linking to users
    const createdVendors = await Vendor.insertMany(
      vendorData.map((vendor, index) => ({
        ...vendor,
        user: createdUsers[index]._id,
      }))
    );

    // Generate sample products, linking to vendors
    const sampleProducts = products.map((product) => {
      const random = Math.floor(Math.random() * createdVendors.length);
      const vendorId = createdVendors[random]._id;

      return {
        ...product,
        vendor: vendorId,
        category:
          categories[Math.floor(Math.random() * categories.length)].name,
      };
    });

    // Insert product data
    await Product.insertMany(sampleProducts);

    console.log("Data saved successfully".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error saving data: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

/**
 * Destroy all data in the database.
 */
const destroyData = async () => {
  try {
    // Delete all vendor, product, and user data
    await Vendor.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data deleted successfully".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error deleting data: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Check command line argument to determine whether to import or destroy data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
