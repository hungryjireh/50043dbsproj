import mongoose from 'mongoose';
import config from './config';


// Connect to MongoDBs
mongoose.Promise = global.Promise;

const { mongodb, mongodbLogs } = config;

const opt = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const mongoDBconnection = mongoose.createConnection(mongodb.uri, opt);
const mongoDBLogsConnection = mongoose.createConnection(mongodbLogs.uri, opt);

mongoDBconnection.on('connected', () => console.log("connected to main mongodb database"));
mongoDBconnection.on('error',  (e) => console.error("error connecting to main mongodb database ->", e.message));

mongoDBLogsConnection.on('connected', () => console.log("connected to main mongodb database"));
mongoDBLogsConnection.on('error',  (e) => console.error("error connecting to log mongodb database ->", e.message));


// MySQL Database connection
const mysql = require("mysql");
const { sqldb: { host, user, password, dbName } } = config;

const SQLconnection = mysql.createConnection({
  host     : host,
  user     : user,
  password : password,
  database : dbName,
});


export {mongoDBconnection, mongoDBLogsConnection, SQLconnection};