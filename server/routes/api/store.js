const express = require("express");
const router = express.Router();

// Load User model
const Store = require("../../models/Store");
const Logs = require("../../models/Logs");

// @route GET api/store
// @get all books in store
// @access Public

router.get('/getbooks', (req, res, next) => {
    Store.find((err, data) => {
        if (err) {
            const newLogs = new Logs({
                timestamp: Date.now(),
                database: "Mongo - Kindle Books",
                method: "GET",
                userID: null,
                parameters: "/getbooks",
                response: "400"
            });
            newLogs.save();
            return res.json({ success: false, error: err });
        } else {
            const newLogs = new Logs({
                timestamp: Date.now(),
                database: "Mongo - Kindle Books",
                method: "GET",
                userID: null,
                parameters: "/getbooks",
                response: "200"
            });
            newLogs.save();
            return res.json({ data });
        }
    }).limit(50);
});

router.get('/book/:bookid', (req, res, next) => {
    Store.findOne({ asin:  req.params.bookid }, (err, data) => {
        if (err) {
            const newLogs = new Logs({
                timestamp: Date.now(),
                database: "Mongo - Kindle Books",
                method: "GET",
                userID: null,
                parameters: "/book/" + asin,
                response: "400"
            });
            newLogs.save();
            return res.json({ success: false, error: err });
        } else {
            const newLogs = new Logs({
                timestamp: Date.now(),
                database: "Mongo - Kindle Books",
                method: "GET",
                userID: null,
                parameters: "/book/" + asin,
                response: "200"
            });
            newLogs.save();
            return res.json({ data });
        }
    })
});

router.get('/search', (req, res, next) => {
    let search = req.query.search || ""
    let category = req.query.category || ""

    var query = { $and: [
        { categories: { $elemMatch: { $elemMatch: { $regex: category, $options: 'i' } } } },
        { $or:[
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ]}
    ]
    }

    Store.find(query, (err, data) => {
        if (err) {
            const newLogs = new Logs({
                timestamp: Date.now(),
                database: "Mongo - Kindle Books",
                method: "GET",
                userID: null,
                parameters: "/search",
                response: "400"
            });
            newLogs.save();
            return res.json({ success: false, error: err });
        } else {
            const newLogs = new Logs({
                timestamp: Date.now(),
                database: "Mongo - Kindle Books",
                method: "GET",
                userID: null,
                parameters: "/search",
                response: "200"
            });
            newLogs.save();
            return res.json({ data });
        }
    })
    .limit(50);
});

module.exports = router;
