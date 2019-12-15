const express = require("express");
var mongoose = require('mongoose');
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

// API Endpoint: http://localhost:5000/api/store/addbook
// NOTE: THIS SAVES THE BOOK TO THE MAIN MONGODB BOOK COLLECTION.
router.post('/addbook', async (req, res, next) => {
    const bookData = req.body;

    // await Store.findOneAndDelete({'title': bookData.title}, (e, d) => console.log("book exist"))
    let exists = await Store.exists({'title': bookData.title})

    if (exists){
        const newLogs = new Logs({
            timestamp: Date.now(),
            database: "Mongo - Books",
            method: "POST",
            userID: bookData.token,
            parameters: "/addbook - Book with title "+bookData.title+" already exists",
            response: "404"
        });
        newLogs.save();
        return res.status(404).json({ result: "Book already exists" });
    }
    const id = new mongoose.Types.ObjectId();
    const newBook = new Store({
        "_id": id,
        "asin": id.toString(),
        "token": bookData.token,
        "title": bookData.title,
        "description": bookData.description,
        "price": bookData.price,
        // "image": book.image, # TODO imageURL not actual image data
    });

    newBook.save()
        .then((r) => {
            const newLogs = new Logs({
                timestamp: Date.now(),
                database: "Mongo - Books",
                method: "POST",
                userID: bookData.token,
                parameters: "/addbook",
                response: "200"
            });
            newLogs.save();
            return res.status(200).json({ result: "success", book: r });
         })
        .catch(err => {
            const newLogs = new Logs({
                timestamp: Date.now(),
                database: "Mongo - Books",
                method: "POST",
                userID: bookData.token,
                parameters: "/addbook",
                response: "500"
            });
            newLogs.save();
            return res.status(500).json(err)
        })
});

module.exports = router;
