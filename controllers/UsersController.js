const mongoose = require('mongoose');
const ModelClass = require('../models/index');
const ModelClassObj = new ModelClass();
const dbConfig = require("../config/configLoader");
const PermissionSeeder = require("../seeds/PermissionsSeeder");
class UserController {

	privateFunction() {
		console.log('private called');
	};
	index(req, res) {
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

	store(req, res) {
		let accessCode = '';
		while (accessCode.length < 6) accessCode += Math.random().toString(36).substr(2, 6 - accessCode.length);
		req.body.accesscode = accessCode;

		if (req.headers.accesscode == 'superadmin') {
			let RoleModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Role;
			let addRole;
			RoleModel.findOne({_id: req.body.role_id}).exec((err, item) => 
			{
				addRole=item;
			});
			let newRoleId = [];
			req.body.role_id=newRoleId;
			let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
			let newUser = UserModel(req.body);
			newUser.save((err, user) => {
				let DBName = 'difoyer_' + req.body.accesscode;
				const connectionString = 'mongodb://' + dbConfig.databaseConfig.host + ":" + dbConfig.databaseConfig.port + '/' + dbConfig.databaseConfig.prefix + DBName;
				const TempDBConn = mongoose.createConnection(connectionString, {
					useNewUrlParser: true
				});
				const UserSchema = require('../migrations/Slave/UsersMigration');
				const TempUser = TempDBConn.model('Users', UserSchema);

				const EntitySchema = require('../migrations/Slave/EntitiesMigration');
				const TempEntity = TempDBConn.model('Entities', EntitySchema);
				let entityData=[{name:'Projects',slug:'projects'},{name:'Users',slug:'users'},{name:'Permissions',slug:'permissions'},{name:'Roles',slug:'roles'}];
				let entityIds=[];
				for (var i = 0; i < entityData.length; i++) {
					let  newEntity = new TempEntity(entityData[i]);
					newEntity.save();
					entityIds.push(newEntity._id);
				}

				if (addRole!=undefined){
					const RoleSchema = require('../migrations/Slave/RolesMigration');
					const TempRole = TempDBConn.model('roles', RoleSchema);
					const newRole = new TempRole({name:addRole['name'],slug:addRole['slug']});
					let roleID;
					newRole.save((err, entity)=>{
						console.log('Role Created');
					});
					newRoleId.push(newRole._id);

					if (addRole['slug']=='admin') 
					{
						const createPermission = new PermissionSeeder();
						createPermission.run(newRole._id,entityIds,TempDBConn);
					}
				}
				req.body.role_id=newRoleId;
				const newUser2 = new TempUser(req.body);
				newUser2.save((err, user) => {
					TempDBConn.close();
				});

				TempDBConn.on('disconnected', function () {
					console.log('temp disconnected');
				});
				res.json({
					'DBname': DBName,
					'user': user
				});
			});
		} 
		else
		{
			let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
			let newUser = UserModel(req.body);
			newUser.save((err, user) => {
				if (!err) {
					res.json({
						'user': user
					});
				} else {
					res.json(user);
				}
			});
		}
	}
	update(req, res) {
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
	delete(req, res) {
		let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
		let userId = req.params.userId;
		UserModel.findOneAndRemove({
			_id: userId
		}, {
			useFindAndModify: false
		}, (err, item) => {
			if (!err) {
				res.json({
					'message': 'success'
				});
			} else {
				res.json(err);
			}
		});
	}
	projectStore(req, res) {
		const newProject = ModelClassObj.getAll().MasterProject(req.body);
		newProject.save();
		const newProject2 = ModelClassObj.getAll().SlaveProject(req.body);
		newProject2.save();
		res.json({
			'hello': 'world'
		});
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