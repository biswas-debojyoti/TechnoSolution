const express = require("express");
const router = express.Router();

const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  updateLeadStatus,
  deleteLead,
  exportLeads,
} = require("../controllers/leadController");

const { protect, requireModuleAccess } = require("../middleware/authMiddleware");
const {
  createLeadValidator,
  updateLeadStatusValidator,
  paginationValidator,
  mongoIdValidator,
} = require("../middleware/validationMiddleware");

// @route  GET /api/leads/export
// @desc   Export leads to CSV
router.get("/export", protect, requireModuleAccess("leads", "read"), exportLeads);

// @route  GET /api/leads
// @desc   Get all leads
router.get("/", protect, requireModuleAccess("leads", "read"), paginationValidator, getAllLeads);

// @route  GET /api/leads/:id
router.get("/:id", protect, requireModuleAccess("leads", "read"), mongoIdValidator, getLeadById);

// @route  POST /api/leads
// @desc   Create a lead
router.post("/", protect, requireModuleAccess("leads", "write"), createLeadValidator, createLead);

// @route  PUT /api/leads/:id
router.put("/:id", protect, requireModuleAccess("leads", "write"), mongoIdValidator, updateLead);

// @route  PATCH /api/leads/:id/status
router.patch("/:id/status", protect, requireModuleAccess("leads", "write"), updateLeadStatusValidator, updateLeadStatus);

// @route  DELETE /api/leads/:id
router.delete("/:id", protect, requireModuleAccess("leads", "write"), mongoIdValidator, deleteLead);

module.exports = router;
