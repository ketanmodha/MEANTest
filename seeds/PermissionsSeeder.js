const mongoose = require('mongoose');
const dbConfig = require("../config/configLoader");
const ModelClass = require('../models/index');
const ModelClassObj = new ModelClass();
class PermissionsSeeder {
	run(role_id,entityIds,TempDBConn) {
		const PermissionSchema = require('../migrations/Slave/PermissionsMigration');
		const TempPermission = TempDBConn.model('Permissions', PermissionSchema);
		let permissionData=[];
		entityIds.forEach(function(ids){
			permissionData.push({role_id:role_id,entity_id:ids,add_data:1,edit_data:1,view_data:1,delete_data:1,importexport_data:1,viewsetting_data:1});
		});

		for (var i = 0; i < permissionData.length; i++) {
			console.log(permissionData[i]);
			let  newPermission = new TempPermission(permissionData[i]);
			newPermission.save();
		}
	}
}
module.exports = PermissionsSeeder;