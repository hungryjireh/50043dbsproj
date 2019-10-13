import mongoose from 'mongoose';
import config from './config';

//TODO log mongo db connection

// Connect to MongoDB
mongoose.Promise = global.Promise;

const { mongodb: { uri } } = config;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const mongoDBconnection = mongoose.connection;


// MySQL Database connection
const mysql = require("mysql");
const { sqldb: { host, user, password, dbName } } = config;

const SQLconnection = mysql.createConnection({
  host     : host,
  user     : user,
  password : password,
  database : dbName,
});

// SQLconnection.connect((err) => {
//   if (err) {
//     console.log("MySQL connection error")
//     throw err;
//   }
//   console.log("MySQL succesfully connected"); 
// });



export {mongoDBconnection, SQLconnection};