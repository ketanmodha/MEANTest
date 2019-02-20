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
router.use('/entities', require('./entity'));
router.use('/roles', require('./roles'));
router.use('/permissions', require('./permissions'));

module.exports = router;