const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
	name: String,
	description: String,
	startDate: Number,
	endDate: Number,
	status: {type: String, enum: ['1','2','3','4']},
	users: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
	createdAt: {type: Number,default:Math.floor(new Date())},
	updatedAt: {type: Number,default:Math.floor(new Date())}
});

module.exports = ProjectSchema;