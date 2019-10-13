const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const Store = mongoose.model("store", StoreSchema);
module.exports = Store;
