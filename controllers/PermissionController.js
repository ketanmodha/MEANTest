const Permissions = require('../models/Permissions');
const Roles = require('../models/Roles');
const Entity = require('../models/Entity');
const mongoose = require('mongoose');

exports.index = (req, res) =>{
	/*Roles.find().deepPopulate('roles').exec((err, data)=>{
		Entity.find().deepPopulate('entities').exec((err, data)=>{
			Permissions.find().deepPopulate('permissions').exec((err, data)=>{
				
			});	
		});
		
	});*/
};
exports.store = (req, res) =>{
	newRole = new Permissions(req.body);
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
