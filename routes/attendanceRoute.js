import express from 'express';


const router = express.Router();

router.post('/checkin');
router.post('/checkout');
router.get('/:employeeId');
router.get('/today/:employeeId');
router.get('/');
router.get('/within-range');

export default router;