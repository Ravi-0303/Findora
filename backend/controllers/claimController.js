const Claim = require("../models/Claim");
const Item = require("../models/Item");

// 1. Submit a Claim
exports.createClaim = async (req, res) => {
  try {
    const { itemId, proof } = req.body;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    if (item.status !== "found") {
      return res.status(400).json({
        message: "Only found items can be claimed"
      });
    }

    if (item.reportedBy.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot claim your own reported item"
      });
    }

    const existingClaim = await Claim.findOne({
      item: itemId,
      claimedBy: req.user.id,
      status: { $in: ["pending", "approved"] }
    });

    if (existingClaim) {
      return res.status(400).json({
        message: "You have already submitted a claim for this item"
      });
    }

    const claim = await Claim.create({
      item: itemId,
      claimedBy: req.user.id,
      proof
    });

    res.status(201).json({
      message: "Claim submitted successfully",
      claim
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get All Claims (Admin)
exports.getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("item")
      .populate("claimedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(claims);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get My Claims (Student)
exports.getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({
      claimedBy: req.user.id
    })
      .populate("item")
      .sort({ createdAt: -1 });

    res.status(200).json(claims);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Approve or Reject Claim (Admin)
exports.updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be approved or rejected"
      });
    }

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        message: "Claim not found"
      });
    }

    if (claim.status !== "pending") {
      return res.status(400).json({
        message: "This claim has already been processed"
      });
    }

    if (status === "approved") {
      const item = await Item.findById(claim.item);

      if (!item || item.status !== "found") {
        return res.status(400).json({
          message: "This item is no longer available"
        });
      }

      item.status = "claimed";
      await item.save();
    }

    claim.status = status;
    await claim.save();

    res.status(200).json({
      message: `Claim ${status} successfully`,
      claim
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};