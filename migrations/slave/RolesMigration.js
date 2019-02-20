const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RoleSchema = new Schema({
	name:String,
	slug:String,
	createdAt: {type: Number,default:Math.floor(new Date() / 1000)},
	updatedAt: {type: Number,default:Math.floor(new Date() / 1000)}
});

module.exports =RoleSchema;