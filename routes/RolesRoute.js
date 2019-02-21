const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController.js')

router.get('/', RoleController.index);
router.get('/:roleId', RoleController.get);
router.post('/', RoleController.store);
router.put('/:roleId', RoleController.update);
router.delete('/:roleId', RoleController.delete);

module.exports = router;