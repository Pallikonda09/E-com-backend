const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();

app.use(cors());
app.use(express.json());

// ✅ API Routes — MUST come before React serving
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);


// ✅ Serve frontend (after API)
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
  });
}).catch((err) => console.error("❌ MongoDB connection error:", err));
