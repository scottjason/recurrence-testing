var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');

router.get('/', controller.render);
router.post('/saveActivity', controller.saveActivity);

module.exports = router;
