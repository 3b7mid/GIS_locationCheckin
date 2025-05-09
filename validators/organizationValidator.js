import { body, param } from "express-validator";
import ApiError from "../utils/apiError.js";
import validatorMiddleware from "../middlewares/validatorMiddleware.js";
import Organization from "../models/organizationModel.js";

export const createOrganizationValidator = [
  body("name")
    .notEmpty()
    .withMessage("Organization Name is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Organization Name must be between 5 and 100 characters")
    .custom(async (name) => {
      const existingorganization = await Organization.findOne({ name });

      if (existingorganization) {
        throw new ApiError(
          `Organization with name ${name} is already exists`,
          400
        );
      }

      return true;
    }),

  body("location.type")
    .notEmpty()
    .withMessage("Location type is required")
    .equals("Point")
    .withMessage("Location type must be Point"),

  body("location.coordinates")
    .notEmpty()
    .withMessage("Coordinates is required")
    .isArray()
    .withMessage("Coordinates must be an array with [longitude, latitude]")
    .custom(([longitude, latitude]) => {
      if (typeof longitude !== "number" || typeof latitude !== "number") {
        throw new ApiError("Coordinates must be numbers", 400);
      }
      if (longitude < -180 || longitude > 180) {
        throw new ApiError("Longitude must be between -180 and 180", 400);
      }
      if (latitude < -90 || latitude > 90) {
        throw new ApiError("Latitude must be between -90 and 90", 400);
      }
      return true;
    })
    .custom(async ([longitude, latitude]) => {
      const existingLocation = await Organization.findOne({
        "location.coordinates": [longitude, latitude],
      });

      if (existingLocation) {
        throw new ApiError(
          "This location is already associated with another organization",
          400
        );
      }

      return true;
    }),

  validatorMiddleware,
];

export const updateOrganizationValidator = [
  param("organizationId")
    .isMongoId()
    .withMessage("Invalid mongo ID format")
    .custom(async (val) => {
      const org = await Organization.findById(val);

      if (!org) {
        throw new ApiError("Organization not found", 404);
      }
    }),

  body("name")
    .optional()
    .notEmpty()
    .withMessage("Organization Name is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Organization Name must be between 5 and 100 characters")
    .custom(async (name) => {
      const existingorganization = await Organization.findOne({ name });

      if (existingorganization) {
        throw new ApiError(
          `Organization with name ${name} is already exists`,
          400
        );
      }

      return true;
    }),

  body("location.type")
    .optional()
    .notEmpty()
    .withMessage("Location type is required")
    .equals("Point")
    .withMessage("Location type must be Point"),

  body("location.coordinates")
    .optional()
    .notEmpty()
    .withMessage("Coordinates is required")
    .isArray()
    .withMessage("Coordinates must be an array with [longitude, latitude]")
    .custom(([longitude, latitude]) => {
      if (typeof longitude !== "number" || typeof latitude !== "number") {
        throw new ApiError("Coordinates must be numbers", 400);
      }
      if (longitude < -180 || longitude > 180) {
        throw new ApiError("Longitude must be between -180 and 180", 400);
      }
      if (latitude < -90 || latitude > 90) {
        throw new ApiError("Latitude must be between -90 and 90", 400);
      }
      return true;
    })
    .custom(async ([longitude, latitude]) => {
      const existingLocation = await Organization.findOne({
        "location.coordinates": [longitude, latitude],
      });

      if (existingLocation) {
        throw new ApiError(
          "This location is already associated with another organization",
          400
        );
      }

      return true;
    }),

  validatorMiddleware,
];

const organizationIdValidator = [
  param("organizationId")
    .isMongoId()
    .withMessage("Invalid mongo ID format")
    .custom(async (organizationId) => {
      const organization = await Organization.findById(organizationId);

      if (!organization) {
        throw new ApiError(`Organization not found`, 404);
      }

      return true;
    }),

  validatorMiddleware,
];

export const getOrganizationValidator = organizationIdValidator;

export const deleteOrganizationValidator = organizationIdValidator;
