
const Item = require("../models/Item");
const Claim = require("../models/Claim");

// Report a Lost or Found Item
exports.createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      status,
      location,
      date
    } = req.body;

    // Get uploaded image path
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const item = await Item.create({
      title,
      description,
      category,
      status,
      location,
      date,
      image,
      reportedBy: req.user.id
    });

    res.status(201).json({
      message: "Item reported successfully",
      item
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(items);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Item
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("reportedBy", "name email");

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    res.status(200).json(item);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    const isOwner = item.reportedBy.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "You can only update your own reported items"
      });
    }

    const allowedFields = [
      "title",
      "description",
      "category",
      "location",
      "date"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        item[field] = req.body[field];
      }
    });

    // Update image only if a new image is uploaded
    if (req.file) {
      item.image = `/uploads/${req.file.filename}`;
    }

    await item.save();

    res.status(200).json({
      message: "Item updated successfully",
      item
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    const isOwner = item.reportedBy.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "You can only delete your own reported items"
      });
    }

    // Check whether claims exist for this item
    const existingClaim = await Claim.findOne({
      item: item._id
    });

    if (existingClaim) {
      return res.status(400).json({
        message: "Cannot delete this item because claim requests exist."
      });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
