const mongoose = require('mongoose');
const ModelClass = require('../models/index');
const ModelClassObj = new ModelClass();
const dbConfig = require("../config/configLoader");

class UserController {

	privateFunction(){
		console.log('private called');
	};
	index(req, res){
		console.log(req);
		let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
		UserModel.find().exec((err, data) => {
			if (!err) {
				res.json(data);
			} else {
				res.send(err);
			}
		});
	}
	store(req, res){
		if(req.headers.accesscode=='superadmin'){
			let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
			let newUser = UserModel(req.body);
			newUser.save((err, user)=>{
				let DBName = 'difoyer_'+req.body.accesscode;
				const TempDBConn = mongoose.createConnection('mongodb://' + dbConfig.databaseConfig.host + ":" + dbConfig.databaseConfig.port + '/' + DBName, {
					useNewUrlParser: true
				});
				const UserSchema = require('../migrations/Slave/UsersMigration');
				const TempUser = TempDBConn.model('Users', UserSchema);

				const EntitySchema = require('../migrations/Slave/EntitiesMigration');
				const TempEntity = TempDBConn.model('Users', EntitySchema);

				const newEntity = new TempEntity([{name:'Projects',slug:'projects'},{name:'Users',slug:'users'}]);
				newUser2.save((err, user)=>{
					console.log('Entity Created');
				});
				TempDBConn.on('disconnected', function () {
					console.log('temp disconnected');
				});
				const newUser2 = new TempUser(req.body);
				newUser2.save((err, user)=>{
					TempDBConn.close();
				});
				res.json({'DBname':DBName,'user':user});
			});
		}else{
			let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
			let newUser = UserModel(req.body);
			newUser.save((err, user)=>{
				if(!err){
					res.json({'user':user});
				}else{
					res.json(user);
				}
			});
		}
	}
	update(req, res){
		let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
		let userId = req.params.userId;
		UserModel.findOneAndUpdate({
			_id: userId
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
		let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
		let userId = req.params.userId;
		UserModel.findOneAndRemove({
			_id: userId
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
	projectStore(req, res){
		const newProject = ModelClassObj.getAll().MasterProject(req.body);
		newProject.save();
		const newProject2 = ModelClassObj.getAll().SlaveProject(req.body);
		newProject2.save();
		res.json({'hello':'world'});
	}

	show(req, res) {
		let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
		let userId = req.params.userId;
		UserModel.findOne({
			_id: userId
		}, (err, item) => {
			if (!err) {
				res.json(item);
			} else {
				res.json(err);
			}
		});
	}
}
module.exports = UserController;