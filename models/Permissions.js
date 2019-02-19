const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PermissionSchema = new Schema({
<<<<<<< HEAD
	role_id:Number,
	entity_id:Number,
=======
	role_id: [{ type: Schema.Types.ObjectId, ref: 'Roles' }],
	entity_id: [{ type: Schema.Types.ObjectId, ref: 'Entity' }],
>>>>>>> Permission model updated
	add_data:Number,
	edit_data:Number,
	view_data:Number,
	delete_data:Number,
<<<<<<< HEAD
	import_export:Number,
	view_setting:Number,
=======
	importexport_data:Number,
	viewsetting_data:Number,
>>>>>>> Permission model updated
	createdAt: {type: Number,default:Math.floor(new Date() / 1000)},
	updatedAt: {type: Number,default:Math.floor(new Date() / 1000)}
});

module.exports = mongoose.model('Permissions', PermissionSchema);