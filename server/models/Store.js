const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import { mongoDBconnection } from '../config/database'

// Create Schema
const StoreSchema = new Schema({
    "asin": { type: String },
    "title": { type: String },
    "description": { type: String },
    "price": { type: Number },
    "imUrl": { type: String },
    "related": { type: [String] },
    "salesRank" : {},
    "brand" : { type: String },
    "categories":{ type: [[String]] },
    "token" : { type: String }, //user ID
});

const Store = mongoDBconnection.model("store", StoreSchema, 'store');
// const Store = mongoDBconnection.model("storeTest", StoreSchema);
module.exports = Store;
