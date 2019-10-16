const express = require("express");
const router = express.Router();

// Load User model
const Store = require("../../models/Store");

// @route GET api/store
// @get all books in store
// @access Public

router.get('/getbooks', (req, res, next) => {
    Store.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ data });
    }).limit(50);
});

router.get('/book/:bookid', (req, res, next) => {
    const bookid = req.params.bookid

    // TODO
    return null
});

router.get('/search', (req, res, next) => {
    let search = req.query.search
    let category = req.query.category

    var query = { $and: [
        { categories: { $elemMatch: { $elemMatch: { $regex: category, $options: 'i' } } } },
        { $or:[
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ]}
    ]
    }

    Store.find(query, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ data });
    })
    .limit(50);
});

module.exports = router;
