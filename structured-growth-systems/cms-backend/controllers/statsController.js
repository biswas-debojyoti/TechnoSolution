const Lead = require("../models/Lead");
const Client = require("../models/Client");
const Inquiry = require("../models/Inquiry");
const Blog = require("../models/Blog");
const Expense = require("../models/Expense");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
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

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    const [
      totalLeads,
      totalClients,
      totalInquiries,
      publishedBlogs,
      newInquiries,
      revenueResult,
      monthlyRevenueAgg,
      monthlyExpenseAgg,
      attendanceTodayResult,
      activeEmployeesCount
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
      ]),
      Client.aggregate([
        { $unwind: "$payments" },
        { $match: { "payments.status": "Paid", "payments.date": { $gte: twelveMonthsAgo } } },
        { 
          $group: { 
            _id: { 
              year: { $year: "$payments.date" }, 
              month: { $month: "$payments.date" } 
            },
            total: { $sum: "$payments.amount" }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]),
      Expense.aggregate([
        { $match: { status: "paid", date: { $gte: twelveMonthsAgo } } },
        { 
          $group: { 
            _id: { 
              year: { $year: "$date" }, 
              month: { $month: "$date" } 
            },
            total: { $sum: "$amount" }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]),
      // Attendance for today
      Attendance.find({ dateString: new Date().toISOString().split('T')[0] }).lean(),
      Employee.countDocuments({ status: 'Active', role: 'employee' })
    ]);

    const todayAttendance = attendanceTodayResult || [];
    const activeEmployeeCount = activeEmployeesCount || 0;
    
    const attendanceStats = {
      present: todayAttendance.filter(a => a.status !== 'completed').length,
      onBreak: todayAttendance.filter(a => a.status === 'on_break').length,
      absent: Math.max(0, activeEmployeeCount - todayAttendance.length)
    };

    // Format monthlyRevenueAgg into last 12 months array
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyRevenue = [];
    
    // Create an array of the last 12 months in order
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const month = d.getMonth() + 1; // 1-12
      
      const foundRev = monthlyRevenueAgg.find(m => m._id.year === year && m._id.month === month);
      const foundExp = monthlyExpenseAgg.find(m => m._id.year === year && m._id.month === month);
      
      monthlyRevenue.push({
        name: monthNames[month - 1],
        revenue: foundRev ? foundRev.total : 0,
        expense: foundExp ? foundExp.total : 0
      });
    }

    const stats = {
      leads: totalLeads,
      clients: totalClients,
      inquiries: totalInquiries,
      revenue: revenueResult.length > 0 ? revenueResult[0].total : 0,
      publishedBlogs,
      newInquiries,
      monthlyRevenue,
      attendance: attendanceStats
    };

    return sendSuccess(res, { stats }, "Dashboard stats fetched successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
