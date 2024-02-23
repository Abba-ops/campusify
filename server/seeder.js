import dotenv from "dotenv";
import colors from "colors";
import userData from "./data/users.js";
import connectDB from "./config/dbConfig.js";
import vendorData from "./data/vendors.js";
import User from "./models/userModel.js";
import products from "./data/products.js";
import Vendor from "./models/vendorModel.js";
import Product from "./models/productModel.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Vendor.deleteMany({});
    await User.deleteMany({});

    const createdUsers = await User.insertMany(userData);

    const createdVendors = await Vendor.insertMany(
      vendorData.map((vendor, index) => ({
        ...vendor,
        user: createdUsers[index]._id,
      }))
    );

    const sampleProducts = products.map((product) => {
      const random = Math.floor(Math.random() * createdVendors.length);
      const vendorId = createdVendors[random]._id;
      return { ...product, vendor: vendorId };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data saved successfully".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error saving data: ${error || error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
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

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
