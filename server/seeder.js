import dotenv from "dotenv";
import colors from "colors";
import userData from "./data/users.js";
import connectDB from "./config/dbConfig.js";
import vendorData from "./data/vendors.js";
import User from "./models/userModel.js";
import products, { categoryData } from "./data/products.js";
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

    const createdCategories = await Category.insertMany(categoryData);

    console.log(createdUsers[Math.floor(Math.random() * createdUsers.length)]);

    // Insert vendor data, linking to users
    const createdVendors = await Vendor.insertMany(
      vendorData.map((vendor, index) => {
        // Find a user with isVendor true
        const vendorUser = createdUsers.find((user) => user.isVendor);

        return {
          ...vendor,
          user: vendorUser ? vendorUser._id : null,
        };
      })
    );

    // Generate sample products, linking to vendors, categories, and subcategories
    const sampleProducts = products.map((product) => {
      const randomVendorIndex = Math.floor(
        Math.random() * createdVendors.length
      );
      const vendorId = createdVendors[randomVendorIndex]._id;

      // Randomly select a category and subcategory
      const randomCategoryIndex = Math.floor(
        Math.random() * createdCategories.length
      );
      const category = createdCategories[randomCategoryIndex];
      const randomSubcategoryIndex = Math.floor(
        Math.random() * category.subcategories.length
      );
      const subcategory = category.subcategories[randomSubcategoryIndex];

      return {
        ...product,
        vendor: vendorId,
        category: category._id,
        subcategory: subcategory._id,
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
