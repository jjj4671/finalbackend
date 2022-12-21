const express = require('express');
const router = express.Router();
const { Task, Employee } = require('../database/models');


const ash = require('express-async-handler');

/** GET ALL employees */
router.get('/', ash(async (req, res) => {
  let employees = await Employee.findAll({ include: [Task] });
  res.status(200).json(employees);
}));

/** GET INSTRUCTOR BY ID*/
router.get('/:id', ash(async (req, res) => {
  let instructor = await Employee.findByPk(req.params.id, { include: [Task] });
  res.status(200).json(instructor);
}));

// Delete instructor
router.delete('/:id', ash(async (req, res) => {
  await Employee.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json("Employee deleted");
}));

// Add new instructor
router.post('/', ash(async (req, res) => {
  let newEmployee = await Employee.create(req.body);
  res.status(200).json(newEmployee);
}));

// Edit instructor
router.put('/:id', ash(async (req, res) => {
  await Employee.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  let instructor = await Employee.findByPk(req.params.id, { include: [Task] });
  res.status(201).json(instructor);
}))

module.exports = router;