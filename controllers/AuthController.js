const mongoose = require('mongoose');
const ModelClass = require('../models/index');
const ModelClassObj = new ModelClass();

class AuthController {
	postLogin(req, res){
		let UserModel = ModelClassObj.codeBasedModel(req.headers.accesscode).User;
		UserModel.findOne({first_name: req.body.first_name},(err, item)=>{
			if(!err){
				if(item){
					res.json({'message':'success','user':item});
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