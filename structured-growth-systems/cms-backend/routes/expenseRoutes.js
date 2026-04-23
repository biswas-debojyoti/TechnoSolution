const express = require("express");
const router = express.Router();
const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseReceipt,
} = require("../controllers/expenseController");
const { protect, requireModuleAccess } = require("../middleware/authMiddleware");
const { handleUploadErrors } = require("../middleware/uploadMiddleware");

// All expense routes require authentication
router.use(protect);

// @route   GET /api/expenses
router.get("/", getAllExpenses);

// @route   POST /api/expenses
router.post(
  "/", 
  requireModuleAccess("expenses", "write"), 
  handleUploadErrors("receipt"), 
  createExpense
);

// @route   GET /api/expenses/:id/receipt
router.get("/:id/receipt", getExpenseReceipt);

// @route   GET /api/expenses/:id
router.get("/:id", getExpenseById);

// @route   PUT /api/expenses/:id
router.put(
  "/:id", 
  requireModuleAccess("expenses", "write"), 
  handleUploadErrors("receipt"), 
  updateExpense
);

// @route   DELETE /api/expenses/:id
router.delete(
  "/:id", 
  requireModuleAccess("expenses", "write"), 
  deleteExpense
);

module.exports = router;
