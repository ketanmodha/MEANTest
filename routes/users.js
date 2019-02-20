const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController.js')
const UsersControllerObj = new UsersController();

router.get('/', UsersControllerObj.index);
router.post('/', UsersControllerObj.store);
router.put('/:userId', UsersControllerObj.update);
router.get('/:userId', UsersControllerObj.show);
router.delete('/:userId', UsersControllerObj.delete);
router.post('/project', UsersControllerObj.projectStore);

module.exports = router;