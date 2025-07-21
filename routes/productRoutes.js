// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");

// // Get All Products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Get Product by ID
// router.get("/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id); // _id in MongoDB
//   if (!product) return res.status(404).json({ message: "Product not found" });
//   res.json(product);
// });




// // Add a Product (Optional, for Admin Use)
// router.post("/", async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     const saved = await product.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ message: "Error saving product", error: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// @desc    Get all products
// @route   GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Get product by ID
// @route   GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// @desc    Create a new product (Admin use)
// @route   POST /api/products
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error saving product", error: err.message });
  }
});

// @desc    Add a review to product
// @route   POST /api/products/:id/reviews
router.post("/:id/reviews", async (req, res) => {
  const { user, comment, rating } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const newReview = { user, comment, rating };
    product.reviews.push(newReview);

    // Calculate updated average rating
    product.rating =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added successfully", reviews: product.reviews });
  } catch (err) {
    res.status(500).json({ message: "Failed to add review", error: err.message });
  }
});

// @desc    Delete a product (Admin)
// @route   DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});

module.exports = router;
