const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PermissionSchema = new Schema({
	role_id: [{ type: Schema.Types.ObjectId, ref: 'Roles' }],
	entity_id: [{ type: Schema.Types.ObjectId, ref: 'Entity' }],
	add_data:Number,
	edit_data:Number,
	view_data:Number,
	delete_data:Number,
	importexport_data:Number,
	viewsetting_data:Number,
	createdAt: {type: Number,default:Math.floor(new Date() / 1000)},
	updatedAt: {type: Number,default:Math.floor(new Date() / 1000)}
});

module.exports =PermissionSchema;