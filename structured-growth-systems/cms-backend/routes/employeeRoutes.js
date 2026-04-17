const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  toggleEmployeeStatus,
  getEmployeeImage,
  getEmployeeDocument,
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

// @route  GET /api/employees/:id/image
// Public to allow <img src> to work in Admin Panel
router.get("/:id/image", getEmployeeImage);

// @route  GET /api/employees/:id/documents/:docId
// Public to allow easy downloads
router.get("/:id/documents/:docId", getEmployeeDocument);

module.exports = router;
