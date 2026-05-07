const Employee = require("../models/Employee");
const SalaryPayment = require("../models/SalaryPayment");
const { sendSuccess, sendError, sendPaginated } = require("../utils/apiResponse");

/**
 * Helper to clean numeric objects (convert empty strings to 0 or null)
 */
const cleanNumericObject = (obj) => {
  if (!obj || typeof obj !== "object") return obj;
  const cleaned = { ...obj };
  Object.keys(cleaned).forEach((key) => {
    if (cleaned[key] === "") {
      cleaned[key] = 0; // Or undefined if we want to use defaults
    } else if (!isNaN(cleaned[key])) {
      cleaned[key] = Number(cleaned[key]);
    }
  });
  return cleaned;
};

/**
 * @desc    Create a new employee
 * @route   POST /api/employees
 * @access  Private (Write permission)
 */
const createEmployee = async (req, res, next) => {
  try {
    const {
      name,
      age,
      contactNo,
      whatsappNo,
      designation,
      joiningDate,
      salary,
      userId,
      password,
      permissions,
      salarySetup,
      accountDetails
    } = req.body;

    const existingUser = await Employee.findOne({ userId });
    if (existingUser) {
      return sendError(res, "User ID is already taken", 400);
    }

    let parsedPermissions = ["dashboard:read"];
    if (permissions) {
      try {
        parsedPermissions = typeof permissions === "string" ? JSON.parse(permissions) : permissions;
      } catch (err) {
        parsedPermissions = ["dashboard:read"];
      }
    }

    let parsedSalarySetup = undefined;
    let parsedAccountDetails = undefined;
    if (salarySetup) {
      try { 
        parsedSalarySetup = typeof salarySetup === "string" ? JSON.parse(salarySetup) : salarySetup;
        parsedSalarySetup = cleanNumericObject(parsedSalarySetup);
      } catch(e){}
    }
    if (accountDetails) {
      try { 
        parsedAccountDetails = typeof accountDetails === "string" ? JSON.parse(accountDetails) : accountDetails;
      } catch(e){}
    }

    const newEmployee = new Employee({
      name,
      age,
      contactNo,
      whatsappNo,
      designation,
      joiningDate,
      salary,
      userId,
      password,
      permissions: parsedPermissions,
      status: "active",
      salarySetup: parsedSalarySetup,
      accountDetails: parsedAccountDetails,
    });

    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        newEmployee.image = {
          data: req.files.image[0].buffer,
          contentType: req.files.image[0].mimetype,
        };
      }
      if (req.files.documents && req.files.documents.length > 0) {
        newEmployee.documents = req.files.documents.map((doc) => ({
          filename: doc.originalname,
          data: doc.buffer,
          contentType: doc.mimetype,
        }));
      }
    }

    await newEmployee.save();

    return sendSuccess(res, { employeeId: newEmployee._id }, "Employee created successfully", 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all employees
 * @route   GET /api/employees
 * @access  Private
 */
const getAllEmployees = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const { search, status } = req.query;
    const startIndex = (page - 1) * limit;

    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { designation: { $regex: search, $options: "i" } },
        { userId: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Employee.countDocuments(filter);
    
    // Select everything EXCEPT big binary buffers to keep list fast
    const employees = await Employee.find(filter)
      .select("-image.data -documents.data -password")
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .lean();

    return sendPaginated(res, employees, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    }, "Employees fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an employee
 * @route   DELETE /api/employees/:id
 * @access  Private (Write permission)
 */
const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return sendError(res, "Employee not found", 404);
    return sendSuccess(res, null, "Employee deleted successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get employee by ID
 * @route   GET /api/employees/:id
 * @access  Private
 */
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).select("-image.data -documents.data -password");
    if (!employee) return sendError(res, "Employee not found", 404);
    return sendSuccess(res, { employee }, "Employee fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update employee details
 * @route   PUT /api/employees/:id
 * @access  Private (Write permission)
 */
const updateEmployee = async (req, res, next) => {
  try {
    const {
      name,
      age,
      contactNo,
      whatsappNo,
      designation,
      joiningDate,
      salary,
      userId,
      password,
      permissions,
      salarySetup,
      accountDetails,
    } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) return sendError(res, "Employee not found", 404);

    // Check if new userId is taken
    if (userId && userId !== employee.userId) {
      const existing = await Employee.findOne({ userId });
      if (existing) return sendError(res, "User ID is already taken", 400);
      employee.userId = userId;
    }

    if (name) employee.name = name;
    if (age) employee.age = age;
    if (contactNo) employee.contactNo = contactNo;
    if (whatsappNo) employee.whatsappNo = whatsappNo;
    if (designation) employee.designation = designation;
    if (joiningDate) employee.joiningDate = joiningDate;
    if (salary) employee.salary = salary;
    if (password) employee.password = password;

    if (permissions) {
      try {
        employee.permissions = typeof permissions === "string" ? JSON.parse(permissions) : permissions;
      } catch (err) {
        // keep old perms if invalid JSON
      }
    }

    if (salarySetup) {
      try {
        const parsed = typeof salarySetup === "string" ? JSON.parse(salarySetup) : salarySetup;
        employee.salarySetup = cleanNumericObject(parsed);
      } catch (err) {}
    }
    if (accountDetails) {
      try {
        employee.accountDetails = typeof accountDetails === "string" ? JSON.parse(accountDetails) : accountDetails;
      } catch (err) {}
    }

    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        employee.image = {
          data: req.files.image[0].buffer,
          contentType: req.files.image[0].mimetype,
        };
      }
      if (req.files.documents && req.files.documents.length > 0) {
        // For updates, we'll append new documents or handle logic. 
        // For simplicity here, we append them.
        const newDocs = req.files.documents.map((doc) => ({
          filename: doc.originalname,
          data: doc.buffer,
          contentType: doc.mimetype,
        }));
        employee.documents.push(...newDocs);
      }
    }

    await employee.save();

    return sendSuccess(res, { employeeId: employee._id }, "Employee updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle employee status
 * @route   PATCH /api/employees/:id/status
 * @access  Private (Write permission)
 */
const toggleEmployeeStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select("-image.data -documents.data -password");

    if (!employee) return sendError(res, "Employee not found", 404);

    return sendSuccess(res, employee, "Employee status updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get employee image
 * @route   GET /api/employees/:id/image
 * @access  Private
 */
const getEmployeeImage = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).select("image");
    if (!employee || !employee.image || !employee.image.data) {
      return res.status(404).send("Image not found");
    }
    res.set("Content-Type", employee.image.contentType);
    res.send(employee.image.data);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get employee document
 * @route   GET /api/employees/:id/documents/:docId
 * @access  Private
 */
const getEmployeeDocument = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).select("documents");
    if (!employee) return res.status(404).send("Employee not found");
    
    const doc = employee.documents.id(req.params.docId);
    if (!doc || !doc.data) return res.status(404).send("Document not found");

    res.set("Content-Type", doc.contentType);
    res.set("Content-Disposition", `inline; filename="${doc.filename}"`);
    res.send(doc.data);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Record a salary payment
 * @route   POST /api/employees/:id/salaries
 * @access  Private (Write permission)
 */
const recordSalaryPayment = async (req, res, next) => {
  try {
    const { month, year, earnings, deductions, netSalary } = req.body;
    
    // Validate employee exists
    const employee = await Employee.findById(req.params.id);
    if (!employee) return sendError(res, "Employee not found", 404);

    const newPayment = new SalaryPayment({
      employeeId: req.params.id,
      month,
      year,
      earnings,
      deductions,
      netSalary,
      addedBy: req.admin ? req.admin.id : null,
    });

    await newPayment.save();
    return sendSuccess(res, newPayment, "Salary payment recorded successfully", 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get salary history
 * @route   GET /api/employees/:id/salaries
 * @access  Private
 */
const getSalaryHistory = async (req, res, next) => {
  try {
    const payments = await SalaryPayment.find({ employeeId: req.params.id }).sort({ year: -1, month: -1 });
    return sendSuccess(res, { salaries: payments }, "Salary history fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all salary payments across all employees
 * @route   GET /api/employees/salaries/all
 * @access  Private
 */
const getAllSalaries = async (req, res, next) => {
  try {
    const { year, search, employeeId } = req.query;
    let filter = {};
    if (year) {
      filter.year = parseInt(year, 10);
    }
    
    if (employeeId) {
      filter.employeeId = employeeId;
    }
    
    if (search) {
      const employees = await Employee.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { userId: { $regex: search, $options: "i" } },
        ]
      }).select('_id');
      filter.employeeId = { $in: employees.map(emp => emp._id) };
    }

    const payments = await SalaryPayment.find(filter)
      .populate('employeeId', 'name userId designation')
      .sort({ year: -1, month: -1, createdAt: -1 });

    return sendSuccess(res, { salaries: payments }, "All salaries fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all active employees (basic info for dropdowns)
 * @route   GET /api/employees/active/basic
 * @access  Private
 */
const getAllActiveEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({ status: "active" })
      .select("name userId designation salarySetup")
      .sort({ name: 1 })
      .lean();
    return sendSuccess(res, { employees }, "Active employees fetched successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
