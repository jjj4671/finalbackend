const express = require('express');
const router = express.Router();
const { Task, Employee } = require('../database/models');


const ash = require('express-async-handler');

router.get('/', ash(async (req, res) => {
  //{include: [Employee]}
  let tasks = await Task.findAll();
  res.status(200).json(tasks);
}));

/** GET COURSE BY ID */
router.get('/:id', ash(async (req, res) => {
  let task = await Task.findByPk(req.params.id, { include: [Employee] });
  res.status(200).json(task);
}));

/** ADD NEW COURSE */
router.post('/', function (req, res, next) {
  Task.create(req.body)
    .then(createdTask => res.status(200).json(createdTask))
    .catch(err => next(err));
});

/** DELETE COURSE */
router.delete('/:id', function (req, res, next) {
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json("Deleted a task!"))
    .catch(err => next(err));
});

/******************* EDIT *********************/

router.put('/:id', ash(async (req, res) => {
  await Task.update(req.body,
    { where: { id: req.params.id } }
  );
  let task = await Task.findByPk(req.params.id);
  res.status(201).json(task);
}));

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;