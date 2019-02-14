const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	first_name:String,
	last_name:String,
	phone:String,
	status: {type: String, enum: [0,1]},
	createdAt: {type: Number,default:Math.floor(new Date() / 1000)},
	updatedAt: {type: Number,default:Math.floor(new Date() / 1000)}
});

module.exports = mongoose.model('Users', UserSchema);