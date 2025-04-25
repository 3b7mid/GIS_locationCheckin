import { check, body } from 'express-validator';
import ApiError from '../utils/apiError.js';
import validatorMiddleware from './validatorMiddleware.js';
import Organization from '../models/organizationModel.js';

export const createOrganizationValidator = [
    body('name')
        .notEmpty()
        .withMessage('Organization Name is required')
        .isLength({ min: 5, max: 100 })
        .withMessage('Organization Name must be between 5 and 100 characters')
        .trim()
        .custom(async (name) => {
            const existingorganization = await Organization.findOne({ name });
            if (existingorganization) {
                return Promise.reject(
                    new ApiError(`Oragnization with name ${name} is already exists`, 400)
                );
            }
        }),

    body('location')
        .custom(async (location) => {
            const { latitude, longitude } = location;
            const existingLocation = await Organization.findOne({
                'location.longitude': longitude,
                'location.latitude': latitude
            });

            if (existingLocation) {
                throw new ApiError("This location is already associated with another organization", 400);
            }

            return true;
        }),

    body("location.longitude")
        .notEmpty()
        .withMessage("Longitude is required")
        .isFloat()
        .withMessage("Longitude must be a number")
        .custom(longitude => {
            if (longitude < -180 || longitude > 180) {
                throw new ApiError("Longitude must be between -180 and 180", 400);
            }
            return true;
        }),

    body("location.latitude")
        .notEmpty().withMessage("Latitude is required")
        .isFloat().withMessage("Latitude must be a number")
        .custom(latitude => {
            if (latitude < -90 || latitude > 90) {
                throw new ApiError("Latitude must be between -90 and 90", 400);
            }
            return true;
        }),

    validatorMiddleware
];

const OrganizationIdValidator = [
    check('organizationId')
        .isMongoId()
        .withMessage('Invalid mongo ID format')
        .custom(async (organizationId) => {
            const organization = await Organization.findById(organizationId);

            if (!organization) {
                return Promise.reject(
                    new ApiError(`Organization Not found`, 400)
                );
            }
        }),

    validatorMiddleware
];


export const getOrganizationValidator = [
    OrganizationIdValidator,
    validatorMiddleware
];

export const updateOrganizationValidator = [
    OrganizationIdValidator,
    validatorMiddleware
];

export const deleteOrganizationValidator = [
    OrganizationIdValidator,
    validatorMiddleware
];