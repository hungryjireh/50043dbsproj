const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import { mongoDBconnection } from '../config/database'


// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoDBconnection.model("users", UserSchema);

module.exports = User;
