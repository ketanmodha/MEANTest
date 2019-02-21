const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EntitySchema = new Schema({
	name:String,
	slug:String,
	createdAt: {type: Number,default:Math.floor(new Date() / 1000)},
	updatedAt: {type: Number,default:Math.floor(new Date() / 1000)}
});

module.exports =EntitySchema;