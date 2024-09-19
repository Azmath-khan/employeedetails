import express from 'express';

import {
    createEmployee,
    getEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
} from './EmployeeController.js';

const router = express.Router();

router.get('/', getEmployees);
router.post('/new', createEmployee);
router.get('/employee/:id', getEmployee);
router.put('/update/:id', updateEmployee);
router.delete('/delete/:id', deleteEmployee);

export default router;