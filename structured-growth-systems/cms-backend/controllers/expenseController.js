const Expense = require("../models/Expense");
const { sendSuccess, sendError, sendPaginated } = require("../utils/apiResponse");

/**
 * @desc    Create a new expense
 * @route   POST /api/expenses
 * @access  Private (Write permission)
 */
const createExpense = async (req, res, next) => {
  try {
    const {
      title,
      category,
      amount,
      date,
      description,
      status,
      paymentMethod,
    } = req.body;

    const newExpense = new Expense({
      title,
      category,
      amount,
      date,
      description,
      status,
      paymentMethod,
      addedBy: req.admin._id,
    });

    if (req.file) {
      newExpense.receipt = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        filename: req.file.originalname,
      };
    }

    await newExpense.save();

    return sendSuccess(res, { expenseId: newExpense._id }, "Expense created successfully", 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all expenses
 * @route   GET /api/expenses
 * @access  Private
 */
const getAllExpenses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const { search, category, status, startDate, endDate } = req.query;
    const startIndex = (page - 1) * limit;

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Expense.countDocuments(filter);
    
    // Select everything EXCEPT big binary buffers to keep list fast
    const expenses = await Expense.find(filter)
      .select("-receipt.data")
      .populate("addedBy", "name")
      .sort({ date: -1 })
      .skip(startIndex)
      .limit(limit)
      .lean();

    return sendPaginated(res, expenses, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    }, "Expenses fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an expense
 * @route   DELETE /api/expenses/:id
 * @access  Private (Write permission)
 */
const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return sendError(res, "Expense not found", 404);
    return sendSuccess(res, null, "Expense deleted successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get expense by ID
 * @route   GET /api/expenses/:id
 * @access  Private
 */
const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id).select("-receipt.data").populate("addedBy", "name");
    if (!expense) return sendError(res, "Expense not found", 404);
    return sendSuccess(res, { expense }, "Expense fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get expense receipt image/file
 * @route   GET /api/expenses/:id/receipt
 * @access  Private
 */
const getExpenseReceipt = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id).select("receipt");
    if (!expense || !expense.receipt || !expense.receipt.data) {
      return res.status(404).send("Receipt not found");
    }
    res.set("Content-Type", expense.receipt.contentType);
    if (!expense.receipt.contentType.startsWith('image/')) {
        res.set("Content-Disposition", `inline; filename="${expense.receipt.filename}"`);
    }
    res.send(expense.receipt.data);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update expense details
 * @route   PUT /api/expenses/:id
 * @access  Private (Write permission)
 */
const updateExpense = async (req, res, next) => {
  try {
    const {
      title,
      category,
      amount,
      date,
      description,
      status,
      paymentMethod,
    } = req.body;

    const expense = await Expense.findById(req.params.id);
    if (!expense) return sendError(res, "Expense not found", 404);

    if (title) expense.title = title;
    if (category) expense.category = category;
    if (amount) expense.amount = amount;
    if (date) expense.date = date;
    if (description) expense.description = description;
    if (status) expense.status = status;
    if (paymentMethod) expense.paymentMethod = paymentMethod;

    if (req.file) {
      expense.receipt = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        filename: req.file.originalname,
      };
    }

    await expense.save();

    return sendSuccess(res, { expenseId: expense._id }, "Expense updated successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseReceipt,
};
