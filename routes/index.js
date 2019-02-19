const express 	= require('express');
const router 	= express.Router();
const AuthController = require('../controllers/AuthController.js')
const AuthControllerObj = new AuthController();

router.get('/', function(req, res) {
	res.json({'hello':'world'});
});

router.post('/login', AuthControllerObj.postLogin);

router.use('/users', require('./users'));
router.use('/projects', require('./projects'));

module.exports = router;