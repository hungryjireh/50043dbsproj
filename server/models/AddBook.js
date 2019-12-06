const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import { mongoDBconnection } from '../config/database'

// Create Schema
const AddBook = new Schema({
    // "asin": { type: String }, AUTO GENERATED
    "token": {type: String},
    "title": { type: String },
    "description": { type: String },
    "price": { type: Number },
    "image": { type: String },
});

const AddNewBook = mongoDBconnection.model("AddNewBook", AddBook);
// const AddNewBook = mongoDBconnection.model("AddNewBookTest", AddBook);
module.exports = AddNewBook;