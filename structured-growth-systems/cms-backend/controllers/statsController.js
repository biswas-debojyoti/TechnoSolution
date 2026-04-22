const Lead = require("../models/Lead");
const Client = require("../models/Client");
const Inquiry = require("../models/Inquiry");
const Blog = require("../models/Blog");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * @desc    Get dashboard statistics with optional date range
 * @route   GET /api/stats
 * @access  Private (Admin)
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        dateFilter.createdAt.$lte = end;
      }
    }

    // Revenue filter is slightly different as it targets payment dates
    const revenueFilter = {};
    if (startDate || endDate) {
      revenueFilter["payments.date"] = {};
      if (startDate) revenueFilter["payments.date"].$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        revenueFilter["payments.date"].$lte = end;
      }
    }
    revenueFilter["payments.status"] = "Paid";

    const [
      totalLeads,
      totalClients,
      totalInquiries,
      publishedBlogs,
      newInquiries,
      revenueResult
    ] = await Promise.all([
      Lead.countDocuments(dateFilter),
      Client.countDocuments(dateFilter),
      Inquiry.countDocuments(dateFilter),
      Blog.countDocuments({ ...dateFilter, status: "published" }),
      Inquiry.countDocuments({ ...dateFilter, status: "new" }),
      Client.aggregate([
        { $unwind: "$payments" },
        { $match: revenueFilter },
        { $group: { _id: null, total: { $sum: "$payments.amount" } } }
      ])
    ]);

    const stats = {
      leads: totalLeads,
      clients: totalClients,
      inquiries: totalInquiries,
      revenue: revenueResult.length > 0 ? revenueResult[0].total : 0,
      publishedBlogs,
      newInquiries
    };

    return sendSuccess(res, { stats }, "Dashboard stats fetched successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
