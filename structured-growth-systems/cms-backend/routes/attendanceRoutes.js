const express = require("express");
const router = express.Router();
const { getTodayAttendance, handleAction, getHistory, getAllAttendance } = require("../controllers/attendanceController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/today", getTodayAttendance);
router.post("/action", handleAction);
router.get("/all", getAllAttendance);
router.get("/history/:employeeId", getHistory);

module.exports = router;
