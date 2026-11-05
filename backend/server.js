const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const protect = require("./middleware/authMiddleware");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const claimRoutes = require("./routes/claimRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect routes
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/claims", claimRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully!");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

// Test API
app.get("/", (req, res) => {
  res.send("Welcome to Findora API!");
});

// Protected test route
app.get("/api/protected", protect, (req, res) => {
  res.status(200).json({
    message: "You accessed a protected route successfully!",
    user: req.user
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});