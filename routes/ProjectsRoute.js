const express = require('express');
const router = express.Router();
const ProjectsController = require('../controllers/ProjectsController.js')

router.get('/', ProjectsController.index);
router.get('/:projectId', ProjectsController.get);
router.post('/', ProjectsController.store);
router.put('/:projectId', ProjectsController.update);
router.delete('/:projectId', ProjectsController.delete);

module.exports = router;