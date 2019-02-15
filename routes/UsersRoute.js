const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController.js')

router.get('/', UsersController.index);
router.get('/:userId', UsersController.get);
router.post('/', UsersController.store);
router.post('/login', UsersController.login);
router.put('/:userId', UsersController.update);
router.delete('/:userId', UsersController.delete);

module.exports = router;