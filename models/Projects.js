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
	// createdAt: {type: Number,default:Math.floor(new Date() / 1000)},
	// updatedAt: {type: Number,default:Math.floor(new Date() / 1000)}
});

// ProjectSchema.pre('validate', function(next) {
//   if (this.startDate) this.startDate = Math.floor(new Date(this.startDate) / 1000);
//   if (this.endDate) this.startDate = Math.floor(new Date(this.endDate) / 1000);
//   next();
// });

module.exports = mongoose.model('Projects', ProjectSchema);