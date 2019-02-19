const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
dbConfig = require('./config/configLoader');

const db = mongoose.connect('mongodb://' + dbConfig.databaseConfig.host + ":" + dbConfig.databaseConfig.port + '/' + dbConfig.databaseConfig.database,{ useNewUrlParser: true })
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const Projects = require('./routes/ProjectsRoute');
app.use('/projects',Projects);

const Users = require('./routes/UsersRoute');
app.use('/users',Users);

const Permissions = require('./routes/PermissionRoute');
app.use('/permissions',Permissions);

const Roles = require('./routes/RolesRoute');
app.use('/roles',Roles);

const host = dbConfig.nodeConfig.host;
const port = dbConfig.nodeConfig.port;
console.log(dbConfig);
app.listen(port, host, ()=>{
	console.log('server is running');
})