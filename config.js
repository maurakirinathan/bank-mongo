/*
var host ='localhost';
var port ='27017';
var db ='senz';
*/

var host = process.env.MONGO_HOST;
var port = process.env.MONGO_PORT;
var db = process.env.MONGO_DB;

var config = {
	database: {
		url: 'mongodb://'+host+':'+ port+'/'+db
	},
	server: {
		host: '127.0.0.1',
		port: '3001'
	}
}

module.exports = config
