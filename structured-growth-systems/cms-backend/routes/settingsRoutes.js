const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.use(protect); // All routes are protected

router.get("/", settingsController.getSettings);
router.patch("/", restrictTo("superadmin"), settingsController.updateSettings);

module.exports = router;
