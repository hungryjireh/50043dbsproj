import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from 'winston';
import review from './routes/api/review'
import users from './routes/api/users'
import store from './routes/api/store'
import logs from './routes/api/logs'

require('dotenv').config();

const port = process.env.PORT || 5000;

// Server configuration
var path = require('path');
const app = express(),
    DIST_DIR = path.resolve(__dirname, '../dist'),
    HTML_FILE = path.resolve(DIST_DIR, 'index.html');
app.server = http.createServer(app);

// DB configuration
import { mongoDBconnection } from './config/database';

// Add cors
// let allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Headers', "*");
//   next();
// }
// app.use(allowCrossDomain);
app.use(cors());

// Bodyparser middleware
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the static files from the React app
app.use(express.static(DIST_DIR));

// Passport middleware
const passport = require("passport");
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// An api endpoint
app.use("/api/users", users);
app.use("/api/store", store);
app.use("/api/review", review);
app.use("/api/logs", logs);

// Handles any requests that don't match the ones above
app.get('/*', function(req, res) {
    res.sendFile(HTML_FILE, function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

// Start server
app.server.listen(port);

winston.info(`Started on port ${port}`, 'info');

module.exports = app;
