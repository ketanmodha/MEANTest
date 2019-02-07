const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	name:String,
	type:{type: String, enum: ['1','2','3']},
	email:String,
	createdAt: {type: Number,default:Math.floor(new Date() / 1000)},
	updatedAt: {type: Number,default:Math.floor(new Date() / 1000)}
});

module.exports = mongoose.model('Users', UserSchema);