const Projects = require('../models/Projects');
const Users = require('../models/Users');
const mongoose = require('mongoose');

exports.index = (req, res) => {
	Projects.find().populate('users').exec((err, data) => {
		if (!err) {
			res.json(data);
		} else {
			res.send(err);
		}
	});
};
exports.store = (req, res) => {
	req.body.startDate = Math.floor(new Date(req.body.startDate));
	req.body.endDate = Math.floor(new Date(req.body.endDate));
	async function saveUsers() {
		for (var i = 0; i < req.body.users.length; i++) {

			req.body.users[i]['_id'] = new mongoose.Types.ObjectId();
			//console.log(req.body.users[i]);
			newUser = new Users(req.body.users[i]);
			//await newUser.save();
		}
	}
	saveUsers().then(() => {
		console.log("-------", req.body, "-------");
		newProject = new Projects(req.body);
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
};
exports.update = (req, res) => {
	let projectId = req.params.projectId;
	// let newUsers = req.body.users.map(item => item._id);
	// var oldUsers = 'bb';
	// async function saveUsers() {
	// 	Projects.findOne({_id: projectId}).exec((err, data)=>{
	// 		if(!err){
	// 			oldUsers = 'aa';
	// 		}else{
	// 			res.send(err);
	// 		}
	// 	});
	// 	for(var i = 0; i < req.body.users.length; i++) {

	// 		//await newUser.save();
	// 	}
	// }
	// saveUsers().then(()=>{
	// 	console.log(newUsers);
	// 	console.log('---------');
	// 	console.log(oldUsers);
	// 	res.send({'project':'update '+projectId});
	// });
	req.body.users = [];
	req.body.startDate = Math.floor(new Date(req.body.startDate));
	req.body.endDate = Math.floor(new Date(req.body.endDate));
	console.log("-------", req.body, "-------");
	Projects.findOneAndUpdate({
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
	//res.send({'project':'update '+projectId});
};
exports.delete = (req, res) => {
	let projectId = req.params.projectId;
	Projects.findById(projectId, (err, item) => {
		if (!err) {
			let userIds = item.users;
			item.remove((err, item) => {
				Users.deleteMany({
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
};
exports.get = (req, res) => {
	let projectId = req.params.projectId;
	Projects.findById(projectId, (err, item) => {
		if (!err) {
			res.json(item);
		} else {
			res.json(err);
		}
	}).populate('users');
};