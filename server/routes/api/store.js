const express = require("express");
const router = express.Router();

// Load User model
const Store = require("../../models/Store");
const Logs = require("../../models/Logs");

// @route GET api/store
// @get all books in store
// @access Public

// API Endpoint: http://localhost:5000/api/store/getbooks
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

// API Endpoint: http://localhost:5000/api/store/book/:bookid
router.get('/book/:bookid', (req, res, next) => {
    const asin = req.params.bookid;
    Store.findOne({ 'asin':  asin }, (err, data) => {
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

// API Endpoint: http://localhost:5000/api/store/:bookid
// NOTE: THIS SAVES THE BOOK TO THE MAIN MONGODB BOOK COLLECTION.
router.post('/:bookID', (req, res, next) => {

    const bookID = req.params.bookID;
    const bookData = req.body;

    Store.findOne({ bookID }).then(store => {
        // Check if book exists
        if (store) {
          const newLogs = new Logs({
              timestamp: Date.now(),
              database: "Mongo - Books",
              method: "POST",
              userID: null,
              parameters: "/:bookID - " + bookID + ". Book already exists",
              response: "404"
          });
          newLogs.save();
          return res.status(404).json({ booknotfound: "Book already exists" });
        } else {
            const newBook = new Store({
                "asin": bookID,
                "title": bookData.title,
                "description": bookData.description,
                "price": bookData.price,
                "imUrl": bookData.imUrl,
                "related": bookData.related,
                "salesRank" : bookData.salesRank,
                "brand" : bookData.brand,
                "categories": bookData.categories
            });
            newBook.save()
            const newLogs = new Logs({
                timestamp: Date.now(),
                database: "Mongo - Books",
                method: "POST",
                userID: null,
                parameters: "/:bookID - " + bookID,
                response: "200"
            });
            newLogs.save();
            return res
              .status(200)
              .json({ bookData: "success" });
        }
    });
});

module.exports = router;
