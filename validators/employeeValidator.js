import { body, param } from "express-validator";
import ApiError from "../utils/apiError.js";
import validatorMiddleware from "../middlewares/validatorMiddleware.js";
import Organization from "../models/organizationModel.js";
import Employee from "../models/employeeModel.js";

export const createEmployeeValidator = [
  body("name")
    .notEmpty()
    .withMessage("Employee Name is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Employee Name must be between 5 and 100 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email address, EX: emp@gmail.com")
    .custom(async (val) => {
      const employee = await Employee.findOne({ email: val });

      if (employee) {
        throw new ApiError("Email already in use", 400);
      }

      return true;
    }),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone format, Ex: 01020135468")
    .custom(async (val) => {
      const employee = await Employee.findOne({ phone: val });

      if (employee) {
        throw new ApiError("phone already in use", 404);
      }

      return true;
    }),

  body("organizationId")
    .notEmpty()
    .withMessage("Employee must belong to an organization")
    .isMongoId()
    .withMessage("Invalid mongodb ID format")
    .custom(async (organizationId) => {
      const organization = await Organization.findById(organizationId);

      if (!organization) {
        throw new ApiError(`Organization not found`, 404);
      }

      return true;
    }),

  validatorMiddleware,
];

export const updateEmployeeValidator = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Employee Name is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Employee Name must be between 5 and 100 characters"),

  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email address, EX: emp@gmail.com")
    .custom(async (val) => {
      const employee = await Employee.findOne({ email: val });

      if (employee) {
        throw new ApiError("Email already in use", 400);
      }

      return true;
    }),

  body("phone")
    .optional()
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone format, Ex: 01020135468")
    .custom(async (val) => {
      const employee = await Employee.findOne({ phone: val });

      if (employee) {
        throw new ApiError("phone already in use", 404);
      }

      return true;
    }),

  body("organizationId")
    .optional()
    .notEmpty()
    .withMessage("Employee must belong to an organization")
    .isMongoId()
    .withMessage("Invalid mongodb ID format")
    .custom(async (organizationId) => {
      const organization = await Organization.findById(organizationId);

      if (!organization) {
        throw new ApiError(`Organization not found`, 404);
      }

      return true;
    }),

  validatorMiddleware,
];

const employeeIdValidator = [
  param("employeeId")
    .isMongoId()
    .withMessage("Invalid mongo ID format")
    .custom(async (employeeId) => {
      const employee = await Employee.findById(employeeId);

      if (!employee) {
        throw new ApiError(`Employee not found`, 404);
      }

      return true;
    }),

  validatorMiddleware,
];

export const getEmployeeValidator = employeeIdValidator;

export const deleteEmployeeValidator = employeeIdValidator;
