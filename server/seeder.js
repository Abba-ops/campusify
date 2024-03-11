import dotenv from "dotenv";
import colors from "colors";
import userData from "./data/users.js";
import connectDB from "./config/dbConfig.js";
import vendorData from "./data/vendors.js";
import { categoryData, products } from "./data/products.js";
import User from "./models/userModel.js";
import { Category, Product, Subcategory } from "./models/productModel.js";
import Vendor from "./models/vendorModel.js";

dotenv.config();
connectDB();

const clearDatabase = async () => {
  await Product.deleteMany();
  await Vendor.deleteMany();
  await User.deleteMany();
  await Category.deleteMany();
  await Subcategory.deleteMany();
};

const linkVendorToUser = (vendors, users) => {
  return vendors.map((vendor) => ({
    ...vendor,
    user: users.find((user) => user.isVendor)?._id || null,
  }));
};

const generateSampleProducts = (vendors, categories, subcategories) => {
  return products.map((product) => {
    const randomVendorIndex = Math.floor(Math.random() * vendors.length);
    const vendorId = vendors[randomVendorIndex]._id;

    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[randomCategoryIndex];

    const randomSubcategoryIndex = Math.floor(
      Math.random() * subcategories.length
    );
    const subcategory = subcategories[randomSubcategoryIndex]._id;

    return {
      ...product,
      vendor: vendorId,
      category: category._id,
      subcategory,
    };
  });
};

const importData = async () => {
  try {
    await clearDatabase();

    const allSubcategories = categoryData.reduce((subcategories, category) => {
      return subcategories.concat(
        category.subcategories.map((subcategory) => ({
          name: subcategory.name,
        }))
      );
    }, []);

    const uniqueSubcategories = Array.from(
      new Set(allSubcategories.map((subcategory) => subcategory.name))
    ).map((name) => ({ name }));

    const createdUsers = await User.insertMany(userData);
    const createdCategories = await Category.insertMany(categoryData);
    const createdSubcategories = await Subcategory.insertMany(
      uniqueSubcategories
    );
    const linkedVendors = linkVendorToUser(vendorData, createdUsers);
    const createdVendors = await Vendor.insertMany(linkedVendors);
    const sampleProducts = generateSampleProducts(
      createdVendors,
      createdCategories,
      createdSubcategories
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

    console.log("Data deleted successfully".red.inverse);
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
