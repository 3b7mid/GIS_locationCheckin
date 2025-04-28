import express from 'express';
import { checkInValidator, checkOutValidator, employeeAttendanceValidator, employeeCheckinRangeValidator } from '../middlewares/attendaceMiddleware.js';
import { employeeCheckin, employeeCheckinRange, employeeCheckout, getAllAttendance, getEmployeeAttendance, getTodayAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/checkin', checkInValidator, employeeCheckin);
router.post('/checkout', checkOutValidator, employeeCheckout);
router.get('/employee/:employeeId', employeeAttendanceValidator, getEmployeeAttendance);
router.get('/today/:employeeId', getTodayAttendance);
router.get('/', getAllAttendance);
router.get('/within-range', employeeCheckinRangeValidator, employeeCheckinRange);

export default router;