const Admin = require("../models/Admin");
const { generateToken } = require("../utils/generateToken");
const { sendSuccess, sendError } = require("../utils/apiResponse");

/**
 * @desc    Admin login
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find admin with password field (excluded by default via `select: false`)
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      // Generic message to prevent user enumeration
      return sendError(res, "Invalid email or password", 401);
    }

    if (!admin.isActive) {
      return sendError(res, "Your account has been deactivated. Contact support.", 403);
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return sendError(res, "Invalid email or password", 401);
    }

    // Update last login timestamp
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = generateToken({
      id: admin._id,
      email: admin.email,
      role: admin.role,
    });

    return sendSuccess(
      res,
      {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
      "Login successful"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged-in admin profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    return sendSuccess(res, { admin: req.admin }, "Admin profile fetched");
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe };
