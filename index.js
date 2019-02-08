const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const db = mongoose.connect('mongodb://localhost/PMSCrud',{ useNewUrlParser: true })
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));

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
const Projects = require('./routes/ProjectsRoute');

app.use('/projects',Projects);

const port = 3000;

app.listen(port, ()=>{
	console.log('server is running');
})