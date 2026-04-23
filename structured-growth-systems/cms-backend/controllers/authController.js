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
    console.log(`Login Attempt: ${email}`);

    // 🛠️ TEMPORARY FORCE RESET (Delete this after login)
    if (email === "admin@gmail.com") {
      const existing = await Admin.findOne({ email: "admin@gmail.com" });
      if (existing) {
        existing.password = "123456";
        await existing.save();
        console.log("FORCE RESET: admin@gmail.com password set to 123456");
      } else {
        await Admin.create({
          email: "admin@gmail.com",
          password: "123456",
          name: "Super Admin",
          role: "superadmin"
        });
        console.log("FORCE CREATE: admin@gmail.com created with 123456");
      }
    }

    // Check Admin first
    let user = await Admin.findOne({ email }).select("+password");
    let isEmployee = false;

    // If not Admin, check Employee
    if (!user) {
      const Employee = require("../models/Employee"); // lazy load
      user = await Employee.findOne({ userId: email }).select("+password");
      if (user) {
        isEmployee = true;
      }
    }

    if (!user) {
      return sendError(res, "Invalid credentials", 401);
    }

    if (user.status === "inactive" || user.isActive === false) {
      return sendError(
        res,
        "Your account has been deactivated. Contact support.",
        403,
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    console.log(`Password valid: ${isPasswordValid}`);
    if (!isPasswordValid) {
      return sendError(res, "Invalid credentials", 401);
    }

    // Update last login timestamp for Admin
    if (!isEmployee) {
      user.lastLogin = new Date();
      await user.save({ validateBeforeSave: false });
    }

    const role = isEmployee ? "employee" : user.role;

    const token = generateToken({
      id: user._id,
      email: isEmployee ? user.userId : user.email,
      role: role,
    });

    return sendSuccess(
      res,
      {
        token,
        admin: {
          id: user._id,
          name: user.name,
          email: isEmployee ? user.userId : user.email,
          role: role,
          permissions: isEmployee ? user.permissions : ["write"],
        },
      },
      "Login successful",
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
    return sendSuccess(res, { admin: req.admin }, "Admin profile has fetched");
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe };
