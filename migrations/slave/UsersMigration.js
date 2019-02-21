const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	role_id: [{ type: Schema.Types.ObjectId, ref: 'Roles' }],
	first_name:String,
	last_name:String,
	phone:String,
	status: {type: String, enum: [0,1]},
	createdAt: {type: Number,default:Math.floor(new Date())},
	updatedAt: {type: Number,default:Math.floor(new Date())}
});

module.exports = UserSchema;