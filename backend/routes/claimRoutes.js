const express = require("express");
const router = express.Router();

const {
  createClaim,
  getAllClaims,
  getMyClaims,
  updateClaimStatus
} = require("../controllers/claimController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Student submits a claim
router.post("/", protect, createClaim);

// Admin views all claims
router.get("/", protect, admin, getAllClaims);

// Student views their own claims
router.get("/myclaims", protect, getMyClaims);

// Admin approves or rejects claims
router.put("/:id", protect, admin, updateClaimStatus);

module.exports = router;