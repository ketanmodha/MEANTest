const Projects = require('../models/Projects');
const Users = require('../models/Users');
const mongoose = require('mongoose');

exports.index = (req, res) =>{
	Users.find().populate('users').exec((err, data)=>{
		if(!err){
			res.json(data);
		}else{
			res.send(err);
		}
	});
};
exports.store = (req, res) =>{
	newUser = new Users(req.body);
	newUser.save((err, user)=>{
		if(!err){
			console.log('User saved succesfully.');
			res.json(user);
		}else{
			console.log('User not saved.');
			res.json(err);
		}
	})
};
exports.update = (req, res) =>{
	let userId = req.params.userId;
	req.body.users = [];
	req.body.startDate = Math.floor(new Date(req.body.startDate) / 1000);
	req.body.endDate = Math.floor(new Date(req.body.endDate) / 1000);
	Users.findOneAndUpdate({_id: userId}, {$set: req.body}, {new: true,useFindAndModify: false},(err, item)=>{
		if(!err){
			res.json(item);
		}else{
			res.json(err);
		}
	});
};
exports.delete = (req, res) =>{
	let userId = req.params.userId;
	Users.findById(userId,(err, item)=>{
		if(!err){
			let userIds = item.users;
			item.remove((err, item)=>{
				Users.deleteMany({ _id: { $in: userIds}}, function(err) {});
			});
			res.json({'message':'item deleted'});
		}else{
			res.json(err);
		}
	});
};
exports.get = (req, res) =>{
	let userId = req.params.userId;
	Users.findById(userId,(err, item)=>{
		if(!err){
			res.json(item);
		}else{
			res.json(err);
		}
	}).populate('users');
};