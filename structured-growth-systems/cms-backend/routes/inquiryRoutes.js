const express = require("express");
const router = express.Router();

const {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
  getInquiryStats,
} = require("../controllers/inquiryController");
const { protect } = require("../middleware/authMiddleware");
const {
  createInquiryValidator,
  updateInquiryStatusValidator,
  mongoIdValidator,
  paginationValidator,
} = require("../middleware/validationMiddleware");

// @route  POST /api/inquiries  — public (website contact form)
router.post("/", createInquiryValidator, createInquiry);

// @route  GET /api/inquiries/stats  — must come before /:id
router.get("/stats", protect, getInquiryStats);

// @route  GET /api/inquiries
router.get("/", protect, paginationValidator, getAllInquiries);

// @route  GET /api/inquiries/:id
router.get("/:id", protect, mongoIdValidator, getInquiryById);

// @route  PATCH /api/inquiries/:id/status
router.patch(
  "/:id/status",
  protect,
  updateInquiryStatusValidator,
  updateInquiryStatus,
);

// @route  DELETE /api/inquiries/:id
router.delete("/:id", protect, mongoIdValidator, deleteInquiry);

module.exports = router;
