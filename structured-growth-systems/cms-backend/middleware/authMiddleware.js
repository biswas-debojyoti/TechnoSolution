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

    // Confirm admin still exists and is active
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return sendError(res, "The admin associated with this token no longer exists.", 401);
    }

    if (!admin.isActive) {
      return sendError(res, "This admin account has been deactivated.", 403);
    }

    req.admin = admin;
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

module.exports = { protect, restrictTo };
