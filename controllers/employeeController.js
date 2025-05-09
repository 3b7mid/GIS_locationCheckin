import asyncHandler from "express-async-handler";
import { sanitizeEmployee } from "../utils/sanitizeData.js";
import Employee from "../models/employeeModel.js";

// @desc    Create an employee
// @route   POST /api/employees
// @access  Private/Admin
export const createEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    organization: req.body.organizationId,
  });

  res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: sanitizeEmployee(employee),
  });
});

// @desc    Get all employee
// @route   GET /api/employees
// @access  Private/Admin
export const getAllEmployees = asyncHandler(async (req, res) => {
  const totalEmployees = await Employee.countDocuments();
  const employees = await Employee.find();

  res.status(201).json({
    success: true,
    result: totalEmployees,
    data: employees.map(sanitizeEmployee),
  });
});

// @desc    Get an employee
// @route   GET /api/employees/:employeeId
// @access  Private/Admin
export const getEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const employee = await Employee.findById(employeeId);

  res.status(200).json({
    success: true,
    data: sanitizeEmployee(employee),
  });
});

// @desc    Update an employee
// @route   PUT /api/employees/:employeeId
// @access  Private/Admin
export const UpdateEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const employee = await Employee.findByIdAndUpdate(employeeId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Employee updated successfully",
    data: sanitizeEmployee(employee),
  });
});

// @desc    Delete an employee
// @route   DELETE /api/employees/:employeeId
// @access  Private/Admin
export const deleteEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  await Employee.findByIdAndDelete(employeeId);

  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
});
