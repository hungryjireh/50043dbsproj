const express = require("express");
const router = express.Router();

import { SQLconnection } from '../../config/database'


    // "asin": {type: String },
    // "helpful": { type: String }, // e.g. 2/3
    // "overall": { type: Number },
    // "reviewText": { type: String },
    // "reviewTime": { type: Date },
    // "reviewerID" : {type: String},
    // "reviewerName" : { type: String },
    // "summary":{ type: String },
    // "unixReviewTime": { type: Number},  //timestamp


// @route GET api/review
// @get all reviews from database
// @access Public

router.get('/all', (req, res, next) => {

    const limit = req.query.limit || 10
    const offset = req.query.offset || 0

    const query = `SELECT * from reviews LIMIT ${offset}, ${limit};`
    SQLconnection.query(query, (error, results, fields) => {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.get('/user/:reviewerID', (req, res, next) => { // or -> /api/user/:id/reviews ???
    const reviewerID = req.params.reviewerID
    const limit = req.query.limit || 5
    const offset = req.query.offset || 0

    const query = `SELECT * from reviews WHERE reviewerID == ${reviewerID} LIMIT ${offset}, ${limit};`

    SQLconnection.query(query, (error, results, fields) => {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});


module.exports = router;