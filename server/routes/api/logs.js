const express = require("express");
const router = express.Router();

// Load User model
const Logs = require("../../models/Logs");

// @route GET api/store
// @get all books in store
// @access Public

// API Endpoint: http://localhost:5000/api/logs/getlogs
router.get('/getlogs', (req, res, next) => {
    let limit = req.query.limit || 50;
    let offset = req.query.offset || 0;
    Logs.find((err, data) => res.json({ err, data })).skip(offset).limit(limit);
});

// API Endpoint: http://localhost:5000/api/logs/search
router.get('/search', (req, res, next) => {
    let database = req.query.database || "";
    let response = req.query.response || "";
    let method = req.query.method || "";
    let userID = req.query.userID || "";
    let limit = req.query.limit || 50;
    let offset = req.query.offset || 0;

    var query = {
        $and: [
            { database: { $elemMatch: { $regex: database, $options: 'i' } } },
            { response: { $elemMatch: { $regex: response, $options: 'i' } } },
            { method: { $elemMatch: { $regex: method, $options: 'i' } } },
            { userID: { $elemMatch: { $regex: userID, $options: 'i' } } },
        ]
    }
    Logs.find(query, (err, data) => res.json({ err, data })).skip(offset).limit(limit);
});


module.exports = router;
