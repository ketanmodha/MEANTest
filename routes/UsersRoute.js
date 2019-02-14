const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController.js')

router.get('/', UsersController.index);
router.get('/:userId', UsersController.get);
router.post('/', UsersController.store);
router.put('/:userId', UsersController.update);
router.delete('/:userId', UsersController.delete);

module.exports = router;