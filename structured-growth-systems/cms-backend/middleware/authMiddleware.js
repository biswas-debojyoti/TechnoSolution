const { verifyToken } = require("../utils/generateToken");
const Admin = require("../models/Admin");
const { sendError } = require("../utils/apiResponse");

/**
 * Protect routes: verifies JWT and attaches admin to req.admin
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Support both Bearer token and cookie
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return sendError(res, "Access denied. No token provided.", 401);
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return sendError(res, "Token has expired. Please log in again.", 401);
      }
      return sendError(res, "Invalid token. Please log in again.", 401);
    }

    // Confirm admin or employee still exists and is active
    let user;
    if (decoded.role === "employee") {
      const Employee = require("../models/Employee"); // lazy load
      user = await Employee.findById(decoded.id).select("-password");
      if (!user) {
        return sendError(res, "The employee associated with this token no longer exists.", 401);
      }
      if (user.status === "inactive") {
        return sendError(res, "This employee account has been deactivated.", 403);
      }
      // Map to req.admin for seamless integration with existing routes
      req.admin = {
        _id: user._id,
        name: user.name,
        email: user.userId,
        role: "employee",
        permissions: user.permissions
      };
    } else {
      user = await Admin.findById(decoded.id).select("-password");
      if (!user) {
        return sendError(res, "The admin associated with this token no longer exists.", 401);
      }
      if (!user.isActive) {
        return sendError(res, "This admin account has been deactivated.", 403);
      }
      req.admin = user;
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return sendError(res, "Authentication failed.", 500);
  }
};

/**
 * Restrict access to specific roles
 * @param {...string} roles - Allowed roles
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return sendError(res, "You do not have permission to perform this action.", 403);
    }
    next();
  };
};

/**
 * Ensure user has access to a specific module and action
 */
const requireModuleAccess = (moduleName, action) => {
  return (req, res, next) => {
    // Admin has full access
    if (req.admin.role === "admin" || req.admin.role === "superadmin") {
      return next();
    }
    
    // Employee logic
    if (req.admin.role === "employee" && req.admin.permissions) {
      if (req.admin.permissions.includes(`${moduleName}:${action}`)) {
        return next();
      }
    }
    
    return sendError(res, `You do not have ${action} permission for ${moduleName}`, 403);
  };
};

module.exports = { protect, restrictTo, requireModuleAccess };
