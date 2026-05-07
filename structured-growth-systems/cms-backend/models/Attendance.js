const mongoose = require("mongoose");

const BreakSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
  },
  durationMs: {
    type: Number, // duration in milliseconds
    default: 0,
  }
});

const AttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  dateString: {
    type: String, // YYYY-MM-DD to easily query "today"
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
  },
  breaks: [BreakSchema],
  totalWorkMs: {
    type: Number, // total work time in milliseconds (excluding breaks)
    default: 0,
  },
  status: {
    type: String,
    enum: ["working", "on_break", "completed"],
    default: "working",
  }
}, { timestamps: true });

// Ensure one attendance record per employee per day
AttendanceSchema.index({ employeeId: 1, dateString: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
