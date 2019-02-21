const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController.js')
const RoleControllerObj = new RoleController();
router.get('/', RoleControllerObj.index);
router.get('/:roleId', RoleControllerObj.show);
router.post('/', RoleControllerObj.store);
router.put('/:roleId', RoleControllerObj.update);
router.delete('/:roleId', RoleControllerObj.delete);

module.exports = router;
