var express = require('express');
var router = express.Router();


//Require controller
var controller = require('../controllers/celebrities');

/* GET home page. */
router.get('/', controller.home);

module.exports = router;
