// import { SQLconnection } from '../../config/database'
// const express = require("express");
// const router = express.Router();

// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

// const Logs = require("../../models/Logs");
// const User = require("../../models/User");
// const Store = require("../../models/Store");

// // @route POST api/users/register
// // @desc Register user - Logs
// // @access Public
// router.post("/register", (req, res) => {
//     // Form validation
//     const { errors, isValid } = validateRegisterInput(req.body);
  
//     // Check validation
//     if (!isValid) {
//         const newLogs = new Logs({
//             timestamp: Date.now(),
//             database: "Mongo - Users",
//             method: "POST",
//             userID: null,
//             parameters: "/register",
//             response: "400"
//         });
//         newLogs.save();
//     }
  
//     User.findOne({ email: req.body.email }).then(user => {
//       if (user) {
//         const newLogs = new Logs({
//             timestamp: Date.now(),
//             database: "Mongo - Users",
//             method: "POST",
//             userID: null,
//             parameters: "/register - email already exists",
//             response: "400"
//         });
//         newLogs.save();
//       } else {
//         const newLogs = new Logs({
//             timestamp: Date.now(),
//             database: "Mongo - Users",
//             method: "POST",
//             userID: null,
//             parameters: "/register",
//             response: "200"
//         });
//         newLogs.save();
//       }
//     });
//   });

// // @route POST api/users/login
// // @desc Login user and return JWT token
// // @access Public

// router.post("/login", (req, res) => {
//     // Form validation
//     const {
//       errors,
//       isValid
//     } = validateLoginInput(req.body); // Check validation
  
//     if (!isValid) {
//         const newLogs = new Logs({
//             timestamp: Date.now(),
//             database: "Mongo - Users",
//             method: "POST",
//             userID: null,
//             parameters: "/login - invalid login form",
//             response: "400"
//         });
//         newLogs.save();
//     }
  
//     const email = req.body.email;
//     const password = req.body.password; // Find user by email
  
//     User.findOne({
//       email
//     }).then(user => {
//       // Check if user exists
//       if (!user) {
//         const newLogs = new Logs({
//             timestamp: Date.now(),
//             database: "Mongo - Users",
//             method: "POST",
//             userID: null,
//             parameters: "/login - failed login attempt",
//             response: "400"
//         });
//         newLogs.save();
//       }
  
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "Mongo - Users",
//                 method: "POST",
//                 userID: user.name,
//                 parameters: "/login - successful login attempt",
//                 response: "200"
//             });
//             newLogs.save();
//         } else {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "Mongo - Users",
//                 method: "POST",
//                 userID: user.name,
//                 parameters: "/login - wrong password",
//                 response: "400"
//             });
//             newLogs.save();
//         }
//       });
//     });
//   });

// router.get('/allusers', (req, res, next) => {
//     User.find((err, data) => {
//         if (err) {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "Mongo - Users",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/allusers",
//                 response: "400"
//             });
//             newLogs.save();
//         } else {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "Mongo - Users",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/allusers",
//                 response: "200"
//             });
//             newLogs.save();
//         }
//     });
// });


// // @route GET api/store
// // @get all books in store
// // @access Public
// router.get('/getbooks', (req, res, next) => {
//     Store.find((err, data) => {
//         if (err) {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "Mongo - Kindle Books",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/getbooks",
//                 response: "400"
//             });
//             newLogs.save();
//         } else {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "Mongo - Kindle Books",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/getbooks",
//                 response: "200"
//             });
//             newLogs.save();
//         }
//     });
// });

// router.get('/book/:bookid', (req, res, next) => {
//     Store.findOne({ asin:  req.params.bookid }, (err, data) => {
//         if (err) {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "Mongo - Kindle Books",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/book/" + asin,
//                 response: "400"
//             });
//             newLogs.save();
//         } else {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "Mongo - Kindle Books",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/book/" + asin,
//                 response: "200"
//             });
//             newLogs.save();
//         }
//     })
// });

// router.get('/search', (req, res, next) => {
//     let search = req.query.search || ""
//     let category = req.query.category || ""

//     var query = { $and: [
//         { categories: { $elemMatch: { $elemMatch: { $regex: category, $options: 'i' } } } },
//         { $or:[
//             { title: { $regex: search, $options: 'i' } },
//             { description: { $regex: search, $options: 'i' } }
//         ]}
//     ]
//     }

//     Store.find(query, (err, data) => {
//         if (err) {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "Mongo - Kindle Books",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/search",
//                 response: "400"
//             });
//             newLogs.save();
//         } else {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "Mongo - Kindle Books",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/search",
//                 response: "200"
//             });
//             newLogs.save();
//         }
//     })
//     .limit(50);
// });

// router.get('/user/:reviewerID', (req, res, next) => { // or -> /api/user/:id/reviews ???
//     const reviewerID = req.params.reviewerID
//     const limit = req.query.limit || 5
//     const offset = req.query.offset || 0

//     const query = `SELECT * from reviews WHERE reviewerID == ${reviewerID} LIMIT ${offset}, ${limit};`

//     SQLconnection.query(query, (error, results, fields) => {
//         if (error) {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "MySQL - ReviewerID",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/user/" + reviewerID,
//                 response: "400"
//             });
//             newLogs.save();
//         } else {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "MySQL - ReviewerID",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/user/" + reviewerID,
//                 response: "200"
//             });
//             newLogs.save();
//         }
//     });
// });

// router.get('/book/:bookID', (req, res, next) => { // or -> /api/user/:id/reviews ???
//     const bookID = req.params.bookID
//     const limit = req.query.limit || 10
//     const offset = req.query.offset || 0

//         // find book and get all reviews
//     const query = `TODO LIMIT ${offset}, ${limit};`

//     SQLconnection.query(query, (error, results, fields) => {
//         if (error) {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "MySQL - ReviewerID",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/book/" + bookID,
//                 response: "400"
//             });
//             newLogs.save();
//         } else {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "MySQL - ReviewerID",
//                 method: "GET",
//                 userID: null,
//                 parameters: "/book/" + bookID,
//                 response: "200"
//             });
//             newLogs.save();
//         }
//     });
// });

// router.post('/:bookID', (req, res, next) => {

//     const bookID = req.params.bookID
//     const review = req.body

//     const query = "INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);" //TODO

//     SQLconnection.query(query, (error, results, fields) => {
//         if (error) {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "MySQL - BookID",
//                 method: "POST",
//                 userID: null,
//                 parameters: "/" + bookID,
//                 response: "400"
//             });
//             newLogs.save();
//         } else {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "MySQL - BookID",
//                 method: "POST",
//                 userID: null,
//                 parameters: "/" + bookID,
//                 response: "200"
//             });
//             newLogs.save();
//         }
//     });
// })

// router.put('/:asin', (req, res, next) => {
//     const asin = req.params.asin

//     const query = "UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;" //TODO

//     SQLconnection.query(query, (error, results, fields) => {
//         if (error) {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "MySQL - asin",
//                 method: "PUT",
//                 userID: null,
//                 parameters: "/" + asin,
//                 response: "400"
//             });
//             newLogs.save();
//         } else {
//             const newLogs = new Logs({
//                 timestamp: Date.now(),
//                 database: "MySQL - asin",
//                 method: "PUT",
//                 userID: null,
//                 parameters: "/" + asin,
//                 response: "200"
//             });
//             newLogs.save();
//         }
//     });

//     router.delete("/:asin", (req, res, next) => {
//         const asin = req.params.asin

//         const query = "DELETE FROM table_name WHERE condition;" //TODO

//         SQLconnection.query(query, (error, results, fields) => {
//             if (error) {
//                 const newLogs = new Logs({
//                     timestamp: Date.now(),
//                     database: "MySQL - asin",
//                     method: "DELETE",
//                     userID: null,
//                     parameters: "/" + asin,
//                     response: "400"
//                 });
//                 newLogs.save();
//             } else {
//                 const newLogs = new Logs({
//                     timestamp: Date.now(),
//                     database: "MySQL - asin",
//                     method: "DELETE",
//                     userID: null,
//                     parameters: "/" + asin,
//                     response: "200"
//                 });
//                 newLogs.save();
//             }
//         });
//     })
// })

// module.exports = router;