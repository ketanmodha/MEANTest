const express = require('express');
const router = express.Router();
const EntityController = require('../controllers/EntityController.js')
const EntityControllerObj = new EntityController();

router.get('/', EntityControllerObj.index);
router.post('/', EntityControllerObj.store);
module.exports = router;

