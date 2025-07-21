

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  comment: String,
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  category: String,
  brand: String,
  stock: Number,
  rating: Number, // Optional: auto-calculated average
  reviews: [reviewSchema],
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
