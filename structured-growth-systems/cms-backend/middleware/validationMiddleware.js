const { body, param, query, validationResult } = require("express-validator");
const { sendError } = require("../utils/apiResponse");

/**
 * Run validation results and send error if any
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    }));
    return sendError(res, "Validation failed", 422, formatted);
  }
  next();
};

// ─── Auth Validators ────────────────────────────────────────────────────────

const loginValidator = [
  body("email")
    .notEmpty().withMessage("Login ID / Email is required")
    .trim(),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  validate,
];

// ─── Blog Validators ─────────────────────────────────────────────────────────

const createBlogValidator = [
  body("heading")
    .notEmpty().withMessage("Heading is required")
    .isLength({ max: 200 }).withMessage("Heading cannot exceed 200 characters")
    .trim(),
  body("subHeading")
    .optional()
    .isLength({ max: 500 }).withMessage("Sub-heading cannot exceed 500 characters")
    .trim(),
  body("status")
    .optional()
    .isIn(["draft", "published"]).withMessage("Status must be draft or published"),
  body("content")
    .optional()
    .custom((value) => {
      if (value && typeof value === "string") {
        try {
          JSON.parse(value);
        } catch {
          throw new Error("Content must be valid JSON (EditorJS format)");
        }
      }
      return true;
    }),
  validate,
];

const updateBlogValidator = [
  param("id").isMongoId().withMessage("Invalid blog ID"),
  body("heading")
    .optional()
    .notEmpty().withMessage("Heading cannot be empty")
    .isLength({ max: 200 }).withMessage("Heading cannot exceed 200 characters")
    .trim(),
  body("subHeading")
    .optional()
    .isLength({ max: 500 }).withMessage("Sub-heading cannot exceed 500 characters")
    .trim(),
  body("status")
    .optional()
    .isIn(["draft", "published"]).withMessage("Status must be draft or published"),
  validate,
];

const mongoIdValidator = [
  param("id").isMongoId().withMessage("Invalid ID format"),
  validate,
];

// ─── Inquiry Validators ───────────────────────────────────────────────────────

const createInquiryValidator = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters")
    .trim(),
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("phone")
    .optional()
    .matches(/^[+\d\s\-().]{7,20}$/).withMessage("Please provide a valid phone number"),
  body("message")
    .notEmpty().withMessage("Message is required")
    .isLength({ max: 2000 }).withMessage("Message cannot exceed 2000 characters")
    .trim(),
  validate,
];

const updateInquiryStatusValidator = [
  param("id").isMongoId().withMessage("Invalid inquiry ID"),
  body("status")
    .notEmpty().withMessage("Status is required")
    .isIn(["new", "contacted", "closed"]).withMessage("Status must be new, contacted, or closed"),
  validate,
];

// ─── Employee Validators ────────────────────────────────────────────────────────

const createEmployeeValidator = [
  body("name").notEmpty().withMessage("Name is required").trim(),
  body("age").isInt({ min: 18, max: 100 }).withMessage("Valid age is required"),
  body("contactNo").notEmpty().withMessage("Contact number is required"),
  body("whatsappNo").optional().isString(),
  body("designation").notEmpty().withMessage("Designation is required"),
  body("joiningDate").isISO8601().toDate().withMessage("Valid joining date is required"),
  body("salary").optional({ checkFalsy: true }).isNumeric().withMessage("Valid salary is required"),
  body("userId").notEmpty().withMessage("User ID is required").trim(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("permissions").optional(),
  validate,
];

const updateEmployeeStatusValidator = [
  param("id").isMongoId().withMessage("Invalid employee ID"),
  body("status").isIn(["active", "inactive"]).withMessage("Status must be active or inactive"),
  validate,
];

// ─── Lead Validators ────────────────────────────────────────────────────────────

const createLeadValidator = [
  body("name").notEmpty().withMessage("Name is required").trim(),
  body("phone").notEmpty().withMessage("Phone is required").matches(/^[+\d\s\-().]{7,20}$/).withMessage("Please provide a valid phone number"),
  body("email").optional().isEmail().withMessage("Please provide a valid email address").normalizeEmail(),
  body("source").optional().isIn(["Website", "Referral", "Social Media", "Cold Call", "Other"]),
  body("status").optional().isIn(["New", "Contacted", "Qualified", "Lost", "Converted"]),
  validate,
];

const updateLeadStatusValidator = [
  param("id").isMongoId().withMessage("Invalid lead ID"),
  body("status").isIn(["New", "Contacted", "Qualified", "Lost", "Converted"]).withMessage("Invalid status"),
  validate,
];


// ─── Query Validators ─────────────────────────────────────────────────────────

const paginationValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
  validate,
];

module.exports = {
  loginValidator,
  createBlogValidator,
  updateBlogValidator,
  mongoIdValidator,
  createInquiryValidator,
  updateInquiryStatusValidator,
  createEmployeeValidator,
  updateEmployeeStatusValidator,
  createLeadValidator,
  updateLeadStatusValidator,
  paginationValidator,
};
