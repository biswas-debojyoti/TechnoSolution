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

    /*
    // 🛠️ ROBUST FORCE RESET
    if (email === "admin@gmail.com") {
      let adminAccount = await Admin.findOne({ email: "admin@gmail.com" });
      if (!adminAccount) {
        console.log("Creating default admin...");
        adminAccount = await Admin.create({
          email: "admin@gmail.com",
          password: "123456",
          name: "Super Admin",
          role: "superadmin"
        });
      } else {
        // Just ensure password is correct if we are stuck
        adminAccount.password = "123456";
        await adminAccount.save();
      }
    }
    */

    // Lookup user in Admin
    let user = await Admin.findOne({ email }).select("+password");
    let isEmployee = false;
    
    // If not found in Admin, check Employee
    if (!user) {
      const Employee = require("../models/Employee");
      user = await Employee.findOne({ userId: email }).select("+password");
      isEmployee = !!user;
    }

    if (!user) {
      console.log(`Login Failed: User/Employee ${email} not found`);
      return sendError(res, "Invalid credentials", 401);
    }

    // For Employee, we should check status
    if (isEmployee && user.status === "inactive") {
      return sendError(res, "Account deactivated", 403);
    }
    
    // For Admin, check isActive
    if (!isEmployee && !user.isActive) {
      return sendError(res, "Account deactivated", 403);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log(`Login Failed: Invalid password for ${email}`);
      return sendError(res, "Invalid credentials", 401);
    }

    console.log(`Login Success: ${email} (${isEmployee ? "Employee" : "Admin"})`);

    // Skip lastLogin update for now to speed up response
    // user.lastLogin = new Date();
    // await user.save({ validateBeforeSave: false });

    const token = generateToken({
      id: user._id,
      email: isEmployee ? user.userId : user.email,
      role: isEmployee ? "employee" : user.role,
    });

    const responseData = {
      token,
      admin: {
        id: user._id,
        name: user.name,
        email: isEmployee ? user.userId : user.email,
        role: isEmployee ? "employee" : user.role,
        permissions: isEmployee ? user.permissions : ["write"],
      },
    };

    console.log("Sending Success Response");
    return sendSuccess(res, responseData, "Login successful");
  } catch (error) {
    console.error("Login Error:", error.message);
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

/**
 * @desc    Update logged-in user profile (email/ID and password)
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (req.admin.role === "employee") {
      const Employee = require("../models/Employee");
      const employee = await Employee.findById(req.admin._id).select("+password");
      if (!employee) return sendError(res, "Employee not found", 404);

      if (email) {
        const existing = await Employee.findOne({ userId: email });
        if (existing && existing._id.toString() !== employee._id.toString()) {
          return sendError(res, "User ID is already taken", 400);
        }
        employee.userId = email;
      }
      
      if (password) {
        employee.password = password;
      }
      
      await employee.save();
      
      // Update req.admin data so the response matches
      req.admin.email = employee.userId;
      
      return sendSuccess(res, { admin: req.admin }, "Profile updated successfully");
    } else {
      const admin = await Admin.findById(req.admin._id).select("+password");
      if (!admin) return sendError(res, "Admin not found", 404);

      if (email) {
        const existing = await Admin.findOne({ email });
        if (existing && existing._id.toString() !== admin._id.toString()) {
          return sendError(res, "Email is already taken", 400);
        }
        admin.email = email;
      }
      
      if (password) {
        admin.password = password;
      }
      
      await admin.save();
      
      req.admin.email = admin.email;
      
      return sendSuccess(res, { admin: req.admin }, "Profile updated successfully");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe, updateProfile };
