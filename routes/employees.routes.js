const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees.controller');

router.get('/employees', employeesController.getAll);

router.get('/employees/random', employeesController.getRandom);

router.get('/employees/:id', employeesController.getEmployeeById);

router.post('/employees', employeesController.postEmployee);

router.put('/employees/:id', employeesController.putEmployeeById);

router.delete('/employees/:id', employeesController.deleteEmployee);

module.exports = router;
