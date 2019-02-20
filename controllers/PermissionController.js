const mongoose = require('mongoose');
const ModelClass = require('../models/index');
const ModelClassObj = new ModelClass();

class PermissionController {

	index(req, res){
		let PermissionModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Permissions;
		PermissionModel.find().populate('permissions').exec((err, data) => {
			if (!err) {
				res.json(data);
			} else {
				res.send(err);
			}
		});
	}

	store(req, res){
		let PermisssionModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Permissions;
		let data=req.params;
		let roleId=req.params.role_id;
		let entityId=req.params.entity_id;
		PermisssionModel.findOne({role_id: roleId,entity_id:entityId}, function(err, item) 
		{
			if (item==undefined) 
			{
				data['data']['entity_id'] = entityId;
				data['data']['role_id'] = roleId;
				newPermission = new PermisssionModel(data['data']);
				newPermission.save((err, user)=>{
					if(!err){
						console.log('Permission saved succesfully.');
						res.json(user);
					}else{
						console.log('Permission not saved.');
						res.json(err);
					}
				})
			}
			else
			{
				let userId = req.params.userId;
				req.params.startDate = Math.floor(new Date(req.params.startDate) / 1000);
				req.params.endDate = Math.floor(new Date(req.params.endDate) / 1000);
				PermisssionModel.findOneAndUpdate({_id: item._id}, {$set: data['data']}, {new: true,useFindAndModify: false},(err, item)=>{
					if(!err){
						res.json(item);
					}
					else{
						res.json(err);
					}
				});
			}
		});
	}

	show(req, res){
		let PermissionModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Permissions;
		let roleId = req.params.roleId;
		PermissionModel.find({role_id: roleId}).populate('entity_id').exec((err, item) => {
			if (!err) {
				res.json(item);
			} else {
				res.json(err);
			}
		});
	}
}
module.exports = PermissionController;