const jwt = require("jsonwebtoken");

/**
 * Generate a signed JWT token for an admin user
 * @param {Object} payload - Data to encode in the token
 * @param {string} payload.id - Admin user ID
 * @param {string} payload.email - Admin email
 * @param {string} payload.role - Admin role
 * @returns {string} Signed JWT token
 */
const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    issuer: "cms-backend",
    audience: "cms-admin",
  });
};

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, {
    issuer: "cms-backend",
    audience: "cms-admin",
  });
};

module.exports = { generateToken, verifyToken };
