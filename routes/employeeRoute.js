import express from 'express';
import { createEmployeeValidator, deleteEmployeeValidator, getEmployeeValidator, updateEmployeeValidator } from '../middlewares/employeeMiddleware.js';
import { createEmployee, deleteEmployee, getAllEmployees, getEmployee, UpdateEmployee } from '../controllers/employeeController.js';

const router = express.Router();

router.route('/')
    .get(getAllEmployees)
    .post(createEmployeeValidator, createEmployee);

router.route('/:employeeId')
    .get(getEmployeeValidator, getEmployee)
    .put(updateEmployeeValidator, UpdateEmployee)
    .delete(deleteEmployeeValidator, deleteEmployee);

export default router;