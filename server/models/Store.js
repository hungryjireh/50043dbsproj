const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import { mongoDBconnection } from '../config/database'

// Create Schema
const StoreSchema = new Schema({
    "asin": {type: String },
    "description": { type: String },
    "price": { type: Number },
    "imUrl": { type: String },
    "related": {},
    "salesRank" : {},
    "brand" : { type: String },
    "categories":{}
});

const Store = mongoDBconnection.model("store", StoreSchema);
module.exports = Store;
