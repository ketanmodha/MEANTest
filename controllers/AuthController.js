const mongoose = require('mongoose');
const ModelClass = require('../models/index');
const ModelClassObj = new ModelClass();

class AuthController {
	postLogin(req, res){
		let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
		let RoleModel = ModelClassObj.codeBasedModel(req.headers.accesscode).Role;
		UserModel.findOne({first_name: req.body.first_name},(err, item)=>{
			if(!err){
				if(item){
					let roleData;
					RoleModel.findOne({_id: item.role_id},(err1, item1)=>{
						roleData=item1;
					});
					setTimeout(() => {
							res.json({'message':'success','user':item,'role':roleData});
					},500);
				}else{
					res.json({'message':'fail'});
				}
			}else{
				res.json(err);
			}
		});
	}
}
module.exports = AuthController;