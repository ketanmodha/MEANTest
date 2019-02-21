const mongoose = require('mongoose');
const ModelClass = require('../models/index');
const ModelClassObj = new ModelClass();

class EntityController {
	index(req, res){
		let EntityModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Entity;
		EntityModel.find().exec((err, data) => {
			if (!err) {
				res.json(data);
			} else {
				res.send(err);
			}
		});
	}
	store(req, res){
		let EntityModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Entity;
		let newEntity = EntityModel(req.body);
		newEntity.save((err, entity)=>{
			if(!err){
				res.json({'entity':entity});
			}else{
				res.json(entity);
			}
		});
	}
}
module.exports = EntityController;
