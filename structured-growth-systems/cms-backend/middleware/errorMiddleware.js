const { sendError } = require("../utils/apiResponse");

/**
 * Handle 404 – Route not found
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

/**
 * Global error handler
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";

  // Log all errors in development
  if (process.env.NODE_ENV === "development") {
    console.error("🔴 Error:", {
      message: err.message,
      stack: err.stack,
      statusCode,
    });
  } else {
    // Only log 5xx in production
    if (statusCode >= 500) {
      console.error("🔴 Server Error:", err.message);
    }
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose ValidationError
  if (err.name === "ValidationError") {
    statusCode = 422;
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(statusCode).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // MongoDB Duplicate Key
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field: ${field}`;
  }

  // JWT errors (handled in authMiddleware, but just in case)
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired";
  }

  // Hide internal error messages in production
  const responseMessage =
    statusCode >= 500 && process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : message;

  return sendError(res, responseMessage, statusCode);
};

module.exports = { notFound, errorHandler };
