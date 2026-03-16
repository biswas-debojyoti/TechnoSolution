const express = require("express");
const router = express.Router();

const { login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { loginValidator } = require("../middleware/validationMiddleware");

// @route  POST /api/auth/login
router.post("/login", loginValidator, login);

// @route  GET /api/auth/me
router.get("/me", protect, getMe);

module.exports = router;
