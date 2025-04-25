import express from 'express';


const router = express.Router();

router.route('/')
    .get()
    .post();

router.route('/:employeeId')
    .get()
    .put()
    .delete();

export default router;