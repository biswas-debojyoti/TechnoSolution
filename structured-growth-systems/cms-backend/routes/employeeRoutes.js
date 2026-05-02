const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  toggleEmployeeStatus,
  deleteEmployee,
  getEmployeeImage,
  getEmployeeDocument,
  recordSalaryPayment,
  getSalaryHistory,
  getAllSalaries,
  getAllActiveEmployees,
} = require("../controllers/employeeController");

const { protect, restrictTo, requireModuleAccess } = require("../middleware/authMiddleware");
const { handleMultiUploadErrors } = require("../middleware/uploadMiddleware");
const {
  createEmployeeValidator,
  updateEmployeeStatusValidator,
  paginationValidator,
} = require("../middleware/validationMiddleware");

// @route  GET /api/employees
// @desc   Get all employees (Admin + Read/Write Employees)
router.get("/", protect, requireModuleAccess("employees", "read"), paginationValidator, getAllEmployees);

// @route  GET /api/employees/active/basic
// @desc   Get active employees for dropdowns
router.get("/active/basic", protect, requireModuleAccess("employees", "read"), getAllActiveEmployees);

// @route  GET /api/employees/salaries/all
// @desc   Get global salaries
router.get("/salaries/all", protect, requireModuleAccess("employees", "read"), getAllSalaries);

// @route  GET /api/employees/:id
router.get("/:id", protect, requireModuleAccess("employees", "read"), getEmployeeById);

// @route  POST /api/employees
// @desc   Create an employee
router.post(
  "/",
  protect,
  requireModuleAccess("employees", "write"),
  handleMultiUploadErrors([
    { name: "image", maxCount: 1 },
    { name: "documents", maxCount: 5 }
  ]),
  createEmployeeValidator,
  createEmployee
);

// @route  PUT /api/employees/:id
router.put(
  "/:id",
  protect,
  requireModuleAccess("employees", "write"),
  handleMultiUploadErrors([
    { name: "image", maxCount: 1 },
    { name: "documents", maxCount: 5 }
  ]),
  updateEmployee
);

// @route  PATCH /api/employees/:id/status
// @desc   Toggle status
router.patch(
  "/:id/status",
  protect,
  requireModuleAccess("employees", "write"),
  updateEmployeeStatusValidator,
  toggleEmployeeStatus
);

// @route  DELETE /api/employees/:id
router.delete("/:id", protect, requireModuleAccess("employees", "write"), deleteEmployee);

// @route  GET /api/employees/:id/image
// Public to allow <img src> to work in Admin Panel
router.get("/:id/image", getEmployeeImage);

// @route  GET /api/employees/:id/documents/:docId
// Public to allow easy downloads
router.get("/:id/documents/:docId", getEmployeeDocument);

// @route  POST /api/employees/:id/salaries
// @desc   Record a salary payment
router.post("/:id/salaries", protect, requireModuleAccess("employees", "write"), recordSalaryPayment);

// @route  GET /api/employees/:id/salaries
// @desc   Get salary history
router.get("/:id/salaries", protect, requireModuleAccess("employees", "read"), getSalaryHistory);

module.exports = router;
