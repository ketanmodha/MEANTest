const express 		= require('express');
app = module.exports= express();
const routes 		= require('./routes');
const bodyParser 	= require('body-parser');
const dbConfig 		= require('./config/configLoader');

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

app.use('/', routes);

const host = dbConfig.nodeConfig.host;
const port = dbConfig.nodeConfig.port;

app.listen(port, host, ()=>{
	console.log('server is running');
})