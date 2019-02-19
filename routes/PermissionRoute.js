const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/PermissionController.js')

router.get('/', PermissionController.index);
router.post('/', PermissionController.store);
router.get('/:roleId', PermissionController.get);

module.exports = router;