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

const Projects = require('./routes/ProjectsRoute');

app.use('/projects',Projects);

const port = 3000;

app.listen(port, ()=>{
	console.log('server is running');
})