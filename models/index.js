const mongoose = require('mongoose');
const MasterDBConn = mongoose.createConnection('mongodb://localhost/difoyer_master',{ useNewUrlParser: true });
let SlaveDBConn = '',SlaveUser = '', SlaveProject = '';

const MasterUserSchema = require('../migrations/Master/UsersMigration');
const SlaveUserSchema = require('../migrations/Slave/UsersMigration');

const MasterProjectSchema = require('../migrations/Master/ProjectsMigration');
const SlaveProjectSchema = require('../migrations/Slave/ProjectsMigration');

MasterDBConn.on('connected', function () {
	console.log('master connected');
});
MasterDBConn.on('disconnected', function () {
	console.log('master disconnected');
});

let DBChanger = function (req, res, next) {
	let Path = req._parsedUrl.pathname;
	if(Path=='/users/create-user' || req.headers.accesscode == 'superadmin'){
		next();
	}else{
		let DBName = 'difoyer_'+req.headers.accesscode;
		if(req.headers.accesscode && SlaveDBConn.name != DBName){
			console.log('slave connected '+DBName+'\n');
			SlaveDBConn = MasterDBConn.useDb(DBName);
			
			SlaveUser =  SlaveDBConn.model('Users', SlaveUserSchema);
			SlaveProject =  SlaveDBConn.model('Projects', SlaveProjectSchema);
		}else{
			console.log('slave used '+SlaveDBConn.name+'\n');
		}
		next();
	}
}

app.use(DBChanger);

const MasterUser =  MasterDBConn.model('Users', MasterUserSchema);
const MasterProject =  MasterDBConn.model('Projects', MasterProjectSchema);

class ModelClass{
	getAll()  {
		let Models = {MasterUser,SlaveUser,MasterProject, SlaveProject};
		return Models;
	}
	codeBasedModel(accesscode)  {
		let Models = '';
		if(accesscode=='superadmin'){
			Models = {'User':MasterUser,'Project':MasterProject};
		}else{
			Models = {'User':SlaveUser,'Project':SlaveProject};
		}
		return Models;
	}
}

module.exports = ModelClass;

// const mongoose = require('mongoose');
// const MasterDBConn = mongoose.createConnection('mongodb://localhost/MasterDB',{ useNewUrlParser: true });
// var SlaveDBConn = '';
// var SlaveUser = '';
// const MasterUserSchema = require('../migrations/Master/UsersMigration');
// const SlaveUserSchema = require('../migrations/Slave/UsersMigration');

// var myLogger = function (req, res, next) {
// 	//SlaveDBConn = mongoose.createConnection('mongodb://localhost/abc4',{ useNewUrlParser: true })
// 	SlaveDBConn = MasterDBConn.useDb('abc4');
// 	if(SlaveDBConn){
// 		console.log('aa');
// 		SlaveUser =  SlaveDBConn.model('Users', SlaveUserSchema);
// 	}
// 	console.log('LOGGED');
// 	//console.log(SlaveUser);
// 	next();
// }

// app.use(myLogger);

// //const SlaveDBConn = mongoose.createConnection('mongodb://localhost/MasterDB',{ useNewUrlParser: true });

// //module.exports = MasterDBConn.model('Users', MasterUserSchema);

// const MasterUser =  MasterDBConn.model('Users', MasterUserSchema);


// module.exports = {
// 	Users:{
// 		Master:MasterUser,
// 		Slave:SlaveUser,
// 	}
// };