const Roles = require('../models/Roles');
const mongoose = require('mongoose');

exports.index = (req, res) =>{
	Roles.find().populate('roles').exec((err, data)=>{
		if(!err){
			res.json(data);
		}else{
			res.send(err);
		}
	});
};
exports.store = (req, res) =>{
	newRole = new Roles(req.body);
	newRole.save((err, user)=>{
		if(!err){
			console.log('Role saved succesfully.');
			res.json(user);
		}else{
			console.log('Role not saved.');
			res.json(err);
		}
	})
};
exports.update = (req, res) =>{
	let roleId = req.params.roleId;
	req.body.startDate = Math.floor(new Date(req.body.startDate) / 1000);
	req.body.endDate = Math.floor(new Date(req.body.endDate) / 1000);
	Roles.findOneAndUpdate({_id: roleId}, {$set: req.body}, {new: true,useFindAndModify: false},(err, item)=>{
		if(!err){
			res.json(item);
		}else{
			res.json(err);
		}
	});
};
exports.delete = (req, res) =>{
	let roleId = req.params.roleId;
	Roles.findById(roleId,(err, item)=>{
		if(!err){
			let roleIds = item.roles;
			item.remove((err, item)=>{
				Roles.deleteMany({ _id: { $in: roleIds}}, function(err) {});
			});
			res.json({'message':'item deleted'});
		}else{
			res.json(err);
		}
	});
};
exports.get = (req, res) =>{
	let roleId = req.params.roleId;
	Roles.findById(roleId,(err, item)=>{
		if(!err){
			res.json(item);
		}else{
			res.json(err);
		}
	}).populate('roles');
};