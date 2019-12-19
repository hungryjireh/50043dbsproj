const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import { mongoDBLogsConnection } from '../config/database'

// Create Schema
const LogSchema = new Schema({
    "id": {type: String },
    "timestamp": { type: Number },
    "database": { type: String },
    "method": { type: String },
    "userID" : { type: String},
    "parameters":{ type: Object },
    "response" : { type: Object }
});

const Logs = mongoDBLogsConnection.model("logs", LogSchema, 'logs');

module.exports = Logs;
