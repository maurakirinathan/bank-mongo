/**
 * URL connection format
 * mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
 * 
 * In below connection URL format
 * localhost:27017 = server:port, default port is 27017, port value is optional
 * test = our database name
 * 
 * See more: https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
 */


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
