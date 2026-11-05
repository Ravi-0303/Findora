
const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
} = require("../controllers/itemController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Report Lost or Found Item with image
router.post("/", protect, upload.single("image"), createItem);

// Get All Items
router.get("/", getAllItems);

// Get Single Item
router.get("/:id", getItemById);

// Update Item with optional image
router.put("/:id", protect, upload.single("image"), updateItem);

// Delete Item
router.delete("/:id", protect, deleteItem);

module.exports = router;
