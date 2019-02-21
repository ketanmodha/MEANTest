const express = require('express');
const router = express.Router();
const EntityController = require('../controllers/EntityController.js')

router.get('/', EntityController.index);
router.post('/', EntityController.store);
module.exports = router;