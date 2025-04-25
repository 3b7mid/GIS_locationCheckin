import express from 'express';
import { createOrganization, deleteOrganization, getAllOrganization, getOrganization, UpdateOrganization } from '../controllers/organizationController.js';
import { createOrganizationValidator, deleteOrganizationValidator, getOrganizationValidator, updateOrganizationValidator } from '../middlewares/organizationMiddleware.js';

const router = express.Router();

router.route('/')
    .post(createOrganizationValidator, createOrganization)
    .get(getAllOrganization);

router.route('/:organizationId')
    .get(getOrganizationValidator, getOrganization)
    .put(updateOrganizationValidator, UpdateOrganization)
    .delete(deleteOrganizationValidator, deleteOrganization);

export default router;