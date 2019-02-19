const Permissions = require('../models/Permissions');
const Entity = require('../models/Entity');
const mongoose = require('mongoose');

exports.index = (req, res) =>{
	Permissions.find().populate('permissions').exec((err, data)=>{
		if(!err){
			res.json(data);
		}else{
			res.send(err);
		}
	});
};
exports.store = (req, res) =>{
	let data=req.body;
	let roleId=req.body.role_id;
	let entityId=req.body.entity_id;
	Permissions.findOne({role_id: roleId,entity_id:entityId}, function(err, item) 
	{
		if (item==undefined) 
		{
			data['data']['entity_id'] = entityId;
			data['data']['role_id'] = roleId;
			newPermission = new Permissions(data['data']);
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
			req.body.startDate = Math.floor(new Date(req.body.startDate) / 1000);
			req.body.endDate = Math.floor(new Date(req.body.endDate) / 1000);
			Permissions.findOneAndUpdate({_id: item._id}, {$set: data['data']}, {new: true,useFindAndModify: false},(err, item)=>{
				if(!err){
					res.json(item);
				}
				else{
					res.json(err);
				}
			});
		}
	});
};

exports.get = (req, res) => {
	let roleId = req.params.roleId;
	/*Permissions.find({role_id: roleId}, function(err, item) 
	{
		if (!err) {
			res.json(item);
		} else {
			res.json(err);
		}
	});*/
	Permissions.find({role_id: roleId}).populate('entity_id').exec((err, data)=>{
		if(!err){
			res.json(data);
		}else{
			res.send(err);
		}
	});
};

