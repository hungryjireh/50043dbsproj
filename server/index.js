import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from 'winston';
import review from './routes/api/review'
import users from './routes/api/users'
import store from './routes/api/store'

require('dotenv').config();

const port = process.env.PORT || 5000;

// Server configuration

const app = express(),
    DIST_DIR = `${__dirname}/../dist`,
    HTML_FILE = DIST_DIR + '/index.html'
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

app.use(express.static(DIST_DIR));
// app.get('/*', function(req, res) {
//     res.sendFile(HTML_FILE, function(err) {
//         if (err) {
//             res.status(500).send(err)
//         }
//     })
// })

// Passport middleware
const passport = require("passport");
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/store", store);
app.use("/api/review", review);

// Start server
app.server.listen(port);

winston.info(`Started on port ${port}`, 'info');

module.exports = app;
