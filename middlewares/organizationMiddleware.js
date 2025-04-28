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

    body('location.type')
        .notEmpty()
        .withMessage('Location type is required')
        .equals('Point')
        .withMessage('Location type is required'),

    body("location.coordinates")
        .notEmpty()
        .withMessage("Coordinates is required")
        .isArray()
        .withMessage('Coordinates must be an array with [longitude, latitude]')
        .custom(([longitude, latitude]) => {
            if (typeof longitude !== 'number' || typeof latitude !== 'number') {
                throw new ApiError('Coordinates must be numbers', 400);
            }
            if (longitude < -180 || longitude > 180) {
                throw new ApiError('Longitude must be between -180 and 180', 400);
            }
            if (latitude < -90 || latitude > 90) {
                throw new ApiError('Latitude must be between -90 and 90', 400);
            }
            return true;
        })
        .custom(async ([longitude, latitude]) => {
            const existingLocation = await Organization.findOne({
                'location.coordinates': [longitude, latitude]
            });

            if (existingLocation) {
                throw new ApiError("This location is already associated with another organization", 400);
            }

            return true;
        }),

    validatorMiddleware
];

const organizationIdValidator = [
    check('organizationId')
        .isMongoId()
        .withMessage('Invalid mongo ID format')
        .custom(async (organizationId) => {
            const organization = await Organization.findById(organizationId);

            if (!organization) {
                return Promise.reject(
                    new ApiError(`Organization not found`, 400)
                );
            }
        }),

    validatorMiddleware
];


export const getOrganizationValidator = organizationIdValidator;

export const updateOrganizationValidator = organizationIdValidator;

export const deleteOrganizationValidator = organizationIdValidator;
