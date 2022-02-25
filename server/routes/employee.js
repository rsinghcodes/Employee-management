const express = require('express');

const { validateEmployeeRegistration } = require('../validation/validation');
const Employee = require('../models/Employee');

const router = express.Router();

// Get all employee records
router.get('/get-employees', async (req, res) => {
  try {
    const employees = await Employee.find();

    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// Add new employee in database
router.post('/add-employee', async (req, res) => {
  try {
    const { errors, isValid } = validateEmployeeRegistration(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // checks, if email already exists
    const employee = await Employee.findOne({ email: req.body.email });

    if (employee) {
      return res.status(400).json({ email: 'Email already exists' });
    }

    const { empId, firstname, lastname, email, dob, address, mobile, city } =
      req.body;

    // Save new employee
    const user = await Employee.create({
      empId,
      firstname,
      lastname,
      email,
      address,
      dob,
      mobile,
      city,
    });

    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// Delete employee from database by id
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    // checks, if employee exists or not
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'No employee found!',
      });
    }

    await employee.remove();

    return res.status(200).json({
      success: true,
      message: 'Data deleted successfully',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// Update employee from database by id
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const employee = await Employee.findById(id);

    // checks, if employee exists or not
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'No employee found!',
      });
    }

    if (!req.body) {
      return res
        .status(400)
        .send({ message: 'Data to update can not be empty' });
    }

    await Employee.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Data updated successfully',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

module.exports = router;
