import { body, query, param } from "express-validator";
import ApiError from "../utils/apiError.js";
import validatorMiddleware from "../middlewares/validatorMiddleware.js";
import Employee from "../models/employeeModel.js";

export const checkInValidator = [
  body("employeeId")
    .notEmpty()
    .withMessage("Employee ID is required")
    .isMongoId()
    .withMessage("Invalid employee ID format")
    .custom(async (employeeId) => {
      const employee = await Employee.findById(employeeId);

      if (!employee) {
        throw new ApiError("Employee not found", 404);
      }

      return true;
    }),

  body("checkinLocation")
    .notEmpty()
    .withMessage("Check-in location is required")
    .custom((value) => {
      if (
        !value.coordinates ||
        !Array.isArray(value.coordinates) ||
        value.coordinates.length !== 2
      ) {
        throw new ApiError(
          "Check-in location must have [longitude, latitude]",
          400
        );
      }

      return true;
    }),

  validatorMiddleware,
];

export const checkOutValidator = [
  body("employeeId")
    .notEmpty()
    .withMessage("Employee ID is required")
    .isMongoId()
    .withMessage("Invalid employee ID format")
    .custom(async (employeeId) => {
      const employee = await Employee.findById(employeeId);

      if (!employee) {
        throw new ApiError("Employee not found", 404);
      }

      return true;
    }),

  body("checkoutLocation")
    .notEmpty()
    .withMessage("Check-out location is required")
    .custom((value) => {
      if (
        !value.coordinates ||
        !Array.isArray(value.coordinates) ||
        value.coordinates.length !== 2
      ) {
        throw new ApiError(
          "Check-out location must have [longitude, latitude]",
          400
        );
      }

      return true;
    }),

  validatorMiddleware,
];

export const employeeAttendanceValidator = [
  param("employeeId")
    .notEmpty()
    .withMessage("Employee ID is required")
    .isMongoId()
    .withMessage("Invalid employee ID format")
    .custom(async (employeeId) => {
      const employee = await Employee.findById(employeeId);

      if (!employee) {
        throw new ApiError("Employee not found", 404);
      }

      return true;
    }),
  validatorMiddleware,
];

export const employeeCheckinRangeValidator = [
  query("employeeId")
    .notEmpty()
    .withMessage("Employee ID is required")
    .isMongoId()
    .withMessage("Invalid employee ID format")
    .custom(async (val) => {
      const emp = Employee.findById(val);

      if (!emp) {
        throw new ApiError("Employeed not found", 404);
      }

      return true;
    }),

  query("lat")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat()
    .withMessage("Latitude must bee a number"),

  query("lng")
    .notEmpty()
    .withMessage("longitude is required")
    .isFloat()
    .withMessage("longitude must bee a number"),

  validatorMiddleware,
];
