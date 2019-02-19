const mongoose = require('mongoose');
const ModelClass = require('../models/index');
const ModelClassObj = new ModelClass();

class ProjectController {
	index(req, res){
		let ProjectModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Project;
		ProjectModel.find().populate('users').exec((err, data) => {
			if (!err) {
				res.json(data);
			} else {
				res.send(err);
			}
		});
	}
	store(req, res){
		let ProjectModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Project;
		let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;

		req.body.startDate = Math.floor(new Date(req.body.startDate));
		req.body.endDate = Math.floor(new Date(req.body.endDate));
		async function saveUsers() {
			for (var i = 0; i < req.body.users.length; i++) {
				req.body.users[i]['_id'] = new mongoose.Types.ObjectId();
				let newUser = UserModel(req.body.users[i]);
				await newUser.save();
			}
		}
		saveUsers().then(() => {
			let newProject = ProjectModel(req.body);
			newProject.save((err, project) => {
				if (!err) {
					console.log('project saved');
					res.json(project);
				} else {
					console.log('project not saved');
					res.json(err);
				}
			})
		});
	}
	update(req, res){
		let ProjectModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Project;
		let projectId = req.params.projectId;
		req.body.users = [];
		req.body.startDate = Math.floor(new Date(req.body.startDate));
		req.body.endDate = Math.floor(new Date(req.body.endDate));
		ProjectModel.findOneAndUpdate({
			_id: projectId
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
	show(req, res){
		let ProjectModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Project;
		let projectId = req.params.projectId;
		ProjectModel.findById(projectId).populate('users').exec((err, item) => {
			if (!err) {
				res.json(item);
			} else {
				res.json(err);
			}
		});
	}
	delete(req, res){
		let ProjectModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Project;
		let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
		let projectId = req.params.projectId;
		ProjectModel.findById(projectId, (err, item) => {
			if (!err) {
				let userIds = item.users;
				item.remove((err, item) => {
					UserModel.deleteMany({
						_id: {
							$in: userIds
						}
					}, function (err) {});
				});
				res.json({
					'message': 'item deleted'
				});
			} else {
				res.json(err);
			}
		});
	}
}
module.exports = ProjectController;