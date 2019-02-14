// const mongoose = require('mongoose');
// var conn      = mongoose.createConnection('mongodb://localhost/masterDB',{ useNewUrlParser: true });
// var conn2     = mongoose.createConnection('mongodb://localhost/slaveDB',{ useNewUrlParser: true });

// const Schema = mongoose.Schema;

// let PhotoSchema = new Schema({
//     title: {type: String},
//     url: {type: String},
//     thumbnailUrl: {type: String},
// });

// Photos = conn.model('Photos', PhotoSchema);
// console.log('a');
// // stored in 'testA' database
// var ModelA    = conn.model('Model', new mongoose.Schema({
//   title : { type : String, default : 'model in testA database' }
// }));

// // stored in 'testB' database
// var ModelB    = conn2.model('Model', new mongoose.Schema({
//   title : { type : String, default : 'model in testB database' }
// }));


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient=require('mongodb').MongoClient;

var MasterDBConn = mongoose.createConnection('mongodb://localhost/MasterDB',{ useNewUrlParser: true });


const Schema = mongoose.Schema;

let PhotoSchema = new Schema({
    title: {type: String},
    url: {type: String},
    thumbnailUrl: {type: String},
});

MasterPhotos = MasterDBConn.model('Photos', PhotoSchema);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

var myLogger = function (req, res, next) {
	var SlaveDBConn = mongoose.createConnection('mongodb://localhost/'+req.headers.accesscode,{ useNewUrlParser: true });
	SlavePhotos = SlaveDBConn.model('Photos', PhotoSchema);
	console.log('LOGGED');
	next();
}

app.use(myLogger);

app.post('/save-photo',(req, res)=>{
	var newPhoto = new MasterPhotos(req.body);
	newPhoto.save();
	var newPhoto = new SlavePhotos(req.body);
	newPhoto.save();
	console.log('a');
	res.json({'test':'test'});
});

const port = 3000;

app.listen(port, ()=>{
	console.log('server is running');
})