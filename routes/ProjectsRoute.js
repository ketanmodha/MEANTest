const express = require('express');
const router = express.Router();
const ProjectsController = require('../controllers/ProjectsController.js')

router.get('/', ProjectsController.index);
router.post('/', ProjectsController.store);
router.put('/:projectId', ProjectsController.update);
router.delete('/:projectId', ProjectsController.delete);

module.exports = router;