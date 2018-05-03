var express = require('express');
var router = express.Router();

//Require controller
var controller = require('../controllers/celebrities');

//Create
router.post('/', controller.create);

//Read all
router.get('/', controller.findAll);

//Read one
router.get('/:id', controller.findOne);

//Update
router.put('/:id', controller.update);

//Delete
router.delete('/:id', controller.delete);

module.exports = router;