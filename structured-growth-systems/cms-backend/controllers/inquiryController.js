const Inquiry = require("../models/Inquiry");
const { sendSuccess, sendError, sendPaginated } = require("../utils/apiResponse");

/**
 * @desc    Submit a new inquiry (public endpoint for website visitors)
 * @route   POST /api/inquiries
 * @access  Public
 */
const createInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
      ipAddress: req.ip || req.headers["x-forwarded-for"],
    });

    return sendSuccess(
      res,
      {
        inquiry: {
          id: inquiry._id,
          name: inquiry.name,
          email: inquiry.email,
          createdAt: inquiry.createdAt,
        },
      },
      "Your inquiry has been submitted successfully. We will get back to you soon.",
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all inquiries with pagination and optional filters
 * @route   GET /api/inquiries
 * @access  Private (Admin)
 */
const getAllInquiries = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.status) {
      if (!["new", "contacted", "closed"].includes(req.query.status)) {
        return sendError(res, "Invalid status filter", 400);
      }
      filter.status = req.query.status;
    }

    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
        { message: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const [inquiries, total] = await Promise.all([
      Inquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Inquiry.countDocuments(filter),
    ]);

    return sendPaginated(
      res,
      inquiries,
      {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
      "Inquiries fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single inquiry by ID
 * @route   GET /api/inquiries/:id
 * @access  Private (Admin)
 */
const getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return sendError(res, "Inquiry not found", 404);
    }

    return sendSuccess(res, { inquiry }, "Inquiry fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update inquiry status (admin only action)
 * @route   PATCH /api/inquiries/:id/status
 * @access  Private (Admin)
 */
const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return sendError(res, "Inquiry not found", 404);
    }

    return sendSuccess(res, { inquiry }, `Inquiry status updated to "${status}"`);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an inquiry (optional admin action)
 * @route   DELETE /api/inquiries/:id
 * @access  Private (Admin)
 */
const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return sendError(res, "Inquiry not found", 404);
    }

    return sendSuccess(res, {}, "Inquiry deleted successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get inquiry status counts (dashboard overview)
 * @route   GET /api/inquiries/stats
 * @access  Private (Admin)
 */
const getInquiryStats = async (req, res, next) => {
  try {
    const stats = await Inquiry.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = { new: 0, contacted: 0, closed: 0, total: 0 };
    stats.forEach(({ _id, count }) => {
      result[_id] = count;
      result.total += count;
    });

    return sendSuccess(res, { stats: result }, "Inquiry stats fetched");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
  getInquiryStats,
};
