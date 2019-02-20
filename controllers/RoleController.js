const mongoose = require('mongoose');
const ModelClass = require('../models/index');
const ModelClassObj = new ModelClass();
const dbConfig = require("../config/configLoader");

class RoleController {
	index(req, res){
		console.log(req);
		let RoleModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Role;
		RoleModel.find().exec((err, data) => {
			if (!err) {
				res.json(data);
			} else {
				res.send(err);
			}
		});
	}
	store(req, res){
		let RoleModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Role;
		let newRole = RoleModel(req.body);
		newRole.save((err, entity)=>{
			if(!err){
				res.json({'entity':entity});
			}else{
				res.json(entity);
			}
		});
	}
	update(req, res){
		let RoleModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Role;
		let roleId = req.params.roleId;
		RoleModel.findOneAndUpdate({
			_id: roleId
		}, {
			$set: req.body
		}, {
			new: true,
			useFindAndModify: false
		}, (err, item) => {
			if (!err) {
				res.json(item);
			} else {
				res.json(err);
			}
		});
	}

	delete(req, res){
		let RoleModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Role;
		let roleId = req.params.roleId;
		RoleModel.findOneAndRemove({
			_id: roleId
		}, {
			useFindAndModify: false
		}, (err, item) => {
			if (!err) {
				res.json({'message':'success'});
			} else {
				res.json(err);
			}
		});
	}

	show(req, res)
	{
		let RoleModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Role;
		let roleId = req.params.roleId;
		RoleModel.findById(roleId,(err, item)=>{
			if(!err){
				res.json(item);
			}else{
				res.json(err);
			}
		});
	}
}
module.exports = RoleController;