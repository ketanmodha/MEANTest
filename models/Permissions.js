const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PermissionSchema = new Schema({
	role_id:Number,
	entity_id:Number,
	add_data:Number,
	edit_data:Number,
	view_data:Number,
	delete_data:Number,
	import_export:Number,
	view_setting:Number,
	createdAt: {type: Number,default:Math.floor(new Date() / 1000)},
	updatedAt: {type: Number,default:Math.floor(new Date() / 1000)}
});

module.exports = mongoose.model('Permissions', PermissionSchema);