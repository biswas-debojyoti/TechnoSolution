const mongoose = require("mongoose");
const Attendance = require("../models/Attendance");
const { sendSuccess, sendError } = require("../utils/apiResponse");

// Helper to get local date string YYYY-MM-DD
const getLocalDateString = () => {
  // Use a more robust method that doesn't depend on locale support
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// @desc    Get today's attendance record for the logged-in employee
// @route   GET /api/attendance/today
// @access  Private (Employee only)
const getTodayAttendance = async (req, res) => {
  try {
    if (!req.admin || req.admin.role !== "employee") {
      return sendError(res, "Only employees can fetch attendance", 403);
    }
    
    const dateString = getLocalDateString();
    const attendance = await Attendance.findOne({ 
      employeeId: new mongoose.Types.ObjectId(req.admin._id), 
      dateString 
    });

    sendSuccess(res, { data: attendance }, "Today's attendance");
  } catch (error) {
    console.error("Attendance Error (today):", error);
    sendError(res, "Server Error: " + error.message, 500);
  }
};

// @desc    Handle attendance action (check-in, break-start, break-end, check-out)
// @route   POST /api/attendance/action
// @access  Private (Employee only)
const handleAction = async (req, res) => {
  try {
    if (!req.admin || req.admin.role !== "employee") {
      return sendError(res, "Only employees can perform attendance actions", 403);
    }
    
    const { action } = req.body;
    if (!["check-in", "break-start", "break-end", "check-out"].includes(action)) {
      return sendError(res, "Invalid action", 400);
    }

    const dateString = getLocalDateString();
    const now = new Date();
    
    let attendance = await Attendance.findOne({ 
      employeeId: new mongoose.Types.ObjectId(req.admin._id), 
      dateString 
    });

    if (action === "check-in") {
      if (attendance) {
        return sendError(res, "You have already checked in for today (" + dateString + ")", 400);
      }
      
      try {
        attendance = await Attendance.create({
          employeeId: new mongoose.Types.ObjectId(req.admin._id),
          dateString,
          checkIn: now,
          status: "working"
        });
        return sendSuccess(res, { data: attendance }, "Checked in successfully at " + now.toLocaleTimeString(), 201);
      } catch (createErr) {
        if (createErr.code === 11000) {
          return sendError(res, "Already checked in (Duplicate Record Error)", 400);
        }
        throw createErr;
      }
    }

    if (!attendance) {
      return sendError(res, "You must check in first", 400);
    }

    if (attendance.status === "completed") {
      return sendError(res, "You have already checked out for today", 400);
    }

    if (action === "break-start") {
      if (attendance.status !== "working") return sendError(res, "You are not currently working", 400);
      
      attendance.breaks.push({ start: now });
      attendance.status = "on_break";
      await attendance.save();
      return sendSuccess(res, { data: attendance }, "Break started");
    }

    if (action === "break-end") {
      if (attendance.status !== "on_break") return sendError(res, "You are not currently on a break", 400);
      
      const lastBreak = attendance.breaks[attendance.breaks.length - 1];
      if (lastBreak && !lastBreak.end) {
        lastBreak.end = now;
        lastBreak.durationMs = now.getTime() - lastBreak.start.getTime();
      }
      attendance.status = "working";
      await attendance.save();
      return sendSuccess(res, { data: attendance }, "Break ended");
    }

    if (action === "check-out") {
      if (attendance.status === "on_break") {
        const lastBreak = attendance.breaks[attendance.breaks.length - 1];
        if (lastBreak && !lastBreak.end) {
          lastBreak.end = now;
          lastBreak.durationMs = now.getTime() - lastBreak.start.getTime();
        }
      }
      
      attendance.checkOut = now;
      attendance.status = "completed";
      
      const totalElapsedMs = now.getTime() - attendance.checkIn.getTime();
      const totalBreakMs = attendance.breaks.reduce((sum, b) => sum + (b.durationMs || 0), 0);
      attendance.totalWorkMs = totalElapsedMs - totalBreakMs;
      
      await attendance.save();
      return sendSuccess(res, { data: attendance }, "Checked out successfully");
    }

  } catch (error) {
    console.error("Attendance Action Error:", error);
    sendError(res, "Server Error: " + error.message, 500);
  }
};

// @desc    Get attendance history for an employee
// @route   GET /api/attendance/history/:employeeId
// @access  Private (Admin/Superadmin or self)
const getHistory = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { month, year } = req.query; // optional filters

    // Verify access
    if (req.admin.role === "employee") {
      if (req.admin._id.toString() !== employeeId) {
        return sendError(res, "Unauthorized to view this record", 403);
      }
    }

    const Employee = require("../models/Employee");
    const employee = await Employee.findById(employeeId);
    if (!employee) return sendError(res, "Employee not found", 404);

    let filter = { employeeId };
    
    let targetYear = year || new Date().getFullYear();
    let targetMonth = month || (new Date().getMonth() + 1);

    // Create a regex for dateString "YYYY-MM"
    const monthStr = targetMonth.toString().padStart(2, '0');
    filter.dateString = new RegExp(`^${targetYear}-${monthStr}`);

    const history = await Attendance.find(filter).sort({ dateString: -1 });

    // Generate absent records
    const recordsWithAbsents = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const joiningDate = new Date(employee.joiningDate);
    joiningDate.setHours(0, 0, 0, 0);

    // Get days in target month
    const lastDayOfMonth = new Date(targetYear, targetMonth, 0).getDate();
    
    for (let d = 1; d <= lastDayOfMonth; d++) {
      const currentIterDate = new Date(targetYear, targetMonth - 1, d);
      currentIterDate.setHours(0, 0, 0, 0);

      // Only check up to today and after joining date
      if (currentIterDate > today || currentIterDate < joiningDate) continue;

      const dateStr = `${targetYear}-${monthStr}-${String(d).padStart(2, '0')}`;
      const existing = history.find(h => h.dateString === dateStr);

      if (existing) {
        recordsWithAbsents.push(existing);
      } else {
        // Add dummy absent record
        recordsWithAbsents.push({
          _id: `absent-${dateStr}-${employeeId}`,
          employeeId: employee,
          dateString: dateStr,
          status: 'absent',
          checkIn: null,
          checkOut: null,
          breaks: [],
          totalWorkMs: 0
        });
      }
    }

    // Sort by date descending
    recordsWithAbsents.sort((a, b) => b.dateString.localeCompare(a.dateString));

    sendSuccess(res, { data: recordsWithAbsents }, "Attendance history fetched with absents");
  } catch (error) {
    console.error(error);
    sendError(res, "Server Error", 500);
  }
};

// @desc    Get all employee attendance with filters
// @route   GET /api/attendance/all
// @access  Private (Admin/Superadmin)
const getAllAttendance = async (req, res) => {
  try {
    if (req.admin.role === "employee") {
      return sendError(res, "Unauthorized", 403);
    }

    const { month, year, employeeId, search } = req.query;
    const Employee = require("../models/Employee");

    if (employeeId) {
      // Filtering by specific employee -> Show full month data
      const employee = await Employee.findById(employeeId);
      if (!employee) return sendError(res, "Employee not found", 404);

      let targetYear = year || new Date().getFullYear();
      let targetMonth = month || (new Date().getMonth() + 1);
      const monthStr = targetMonth.toString().padStart(2, '0');
      
      const history = await Attendance.find({ 
        employeeId, 
        dateString: new RegExp(`^${targetYear}-${monthStr}`) 
      }).sort({ dateString: -1 });

      const recordsWithAbsents = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const joiningDate = new Date(employee.joiningDate);
      joiningDate.setHours(0, 0, 0, 0);
      const lastDayOfMonth = new Date(targetYear, targetMonth, 0).getDate();

      for (let d = 1; d <= lastDayOfMonth; d++) {
        const currentIterDate = new Date(targetYear, targetMonth - 1, d);
        currentIterDate.setHours(0, 0, 0, 0);
        if (currentIterDate > today || currentIterDate < joiningDate) continue;

        const dateStr = `${targetYear}-${monthStr}-${String(d).padStart(2, '0')}`;
        const existing = history.find(h => h.dateString === dateStr);

        if (existing) {
          recordsWithAbsents.push(existing.toObject ? existing.toObject() : existing);
        } else {
          recordsWithAbsents.push({
            _id: `absent-${dateStr}-${employeeId}`,
            employeeId: { name: employee.name, userId: employee.userId, designation: employee.designation, _id: employee._id },
            dateString: dateStr,
            status: 'absent',
            checkIn: null,
            checkOut: null,
            breaks: [],
            totalWorkMs: 0
          });
        }
      }
      recordsWithAbsents.sort((a, b) => b.dateString.localeCompare(a.dateString));
      return sendSuccess(res, { data: recordsWithAbsents }, "Employee full month attendance fetched");
    }

    // Default view: Show today's activity for EVERY employee
    const employees = await Employee.find({ status: 'active' });
    const todayStr = getLocalDateString();
    const todayRecords = await Attendance.find({ dateString: todayStr }).populate("employeeId", "name userId designation");

    const finalData = employees.map(emp => {
      const record = todayRecords.find(r => r.employeeId?._id?.toString() === emp._id.toString());
      if (record) return record;

      // If no record, check if joined before/on today
      const joiningDate = new Date(emp.joiningDate);
      joiningDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (joiningDate <= today) {
        return {
          _id: `absent-${todayStr}-${emp._id}`,
          employeeId: { name: emp.name, userId: emp.userId, designation: emp.designation, _id: emp._id },
          dateString: todayStr,
          status: 'absent',
          checkIn: null,
          checkOut: null,
          breaks: [],
          totalWorkMs: 0
        };
      }
      return null;
    }).filter(Boolean);

    // Apply search filter if any
    let filteredData = finalData;
    if (search) {
      const s = search.toLowerCase();
      filteredData = finalData.filter(r => 
        r.employeeId?.name?.toLowerCase().includes(s) || 
        r.employeeId?.userId?.toLowerCase().includes(s)
      );
    }

    sendSuccess(res, { data: filteredData }, "Today's activity for all employees fetched");
  } catch (error) {
    console.error("GetAllAttendance Error:", error);
    sendError(res, "Server Error: " + error.message, 500);
  }
};

module.exports = {
  getTodayAttendance,
  handleAction,
  getHistory,
  getAllAttendance
};
