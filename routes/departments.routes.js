const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/departments.controller');

router.get('/departments', departmentController.getAll);

router.get('/departments/random', departmentController.getRandom);

router.get('/departments/:id', departmentController.getDepartmentById);

router.post('/departments', departmentController.postDepartment);

router.put('/departments/:id', departmentController.putDepartmentById);

router.delete('/departments/:id', departmentController.deleteDepartment);

module.exports = router;