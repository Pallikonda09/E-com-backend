const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();

    // Remove `id` from each product
    const cleanedProducts = products.map(({ id, ...rest }) => rest);

    await Product.insertMany(cleanedProducts);

    console.log("✅ Products Imported!");
    process.exit();
  } catch (error) {
    console.error("❌ Import Failed:", error);
    process.exit(1);
  }
};

importData();
