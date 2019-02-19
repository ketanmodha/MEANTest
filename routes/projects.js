const express 	= require('express');
const router 	= express.Router();
const ProjectController = require('../controllers/ProjectController.js')
const ProjectControllerObj = new ProjectController();

router.get('/', ProjectControllerObj.index);
router.get('/:projectId', ProjectControllerObj.show);
router.post('/', ProjectControllerObj.store);
router.put('/:projectId', ProjectControllerObj.update);
router.delete('/:projectId', ProjectControllerObj.delete);

module.exports = router;