const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const store = require("./routes/api/store");
const review = require("./routes/api/review");



const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const uri = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    uri,
    { useNewUrlParser: true,
      useUnifiedTopology: true}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


  // MySQL Database connection
  const mysql = require("mysql");
  const mySQLParams = require("./config/keys").mySQLParams;

  app.use(function(req, res, next){
    res.locals.mySQLConnection = mysql.createConnection({
      host     : mySQLParams.host,
      user     : mySQLParams.user,
      password : mySQLParams.password,
      database : mySQLParams.database
    });
    res.locals.mySQLConnection
      .connect((err) => {
        if (err) throw err;
        console.log("MySQL succesfully connected"); 
      });
    next();
  });  


// Add cors
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/store", store);
app.use("/api/review", review);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
