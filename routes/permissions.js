const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/PermissionController.js')
const PermissionControllerObj = new PermissionController();
router.get('/', PermissionControllerObj.index);
router.post('/', PermissionControllerObj.store);
router.get('/:roleId', PermissionControllerObj.show);

module.exports = router;
