const Entity = require('../models/Entity');
const mongoose = require('mongoose');

exports.index = (req, res) =>{
	Entity.find().populate('entities').exec((err, data)=>{
		if(!err){
			res.json(data);
		}else{
			res.send(err);
		}
	});
};
exports.store = (req, res) =>{
	newEnity = new Entity(req.body);
	newEnity.save((err, user)=>{
		if(!err){
			console.log('Entity saved succesfully.');
			res.json(user);
		}else{
			console.log('Entity not saved.');
			res.json(err);
		}
	})
};
