/*var host ='localhost';
var port ='27017';
var db ='senz';
var user ='senz';
var pass ='senz';*/

var host = process.env.MONGO_HOST;
var port = process.env.MONGO_PORT;
var db = process.env.MONGO_DB;
var user = process.env.MONGO_USER;
var pass = process.env.MONGO_PASS;

var config = {
	database: {
		url: 'mongodb://'+user+':'+pass+'@'+host+':'+ port+'/'+db
	},
	server: {
		host: '127.0.0.1',
		port: '3001'
	}
}

module.exports = config
