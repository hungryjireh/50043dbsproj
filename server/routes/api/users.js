const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Logs = require("../../models/Logs");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    const newLogs = new Logs({
        timestamp: Date.now(),
        database: "Mongo - Users",
        method: "POST",
        userID: null,
        parameters: "/register",
        response: "400"
    });
    newLogs.save();
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      const newLogs = new Logs({
          timestamp: Date.now(),
          database: "Mongo - Users",
          method: "POST",
          userID: null,
          parameters: "/register - email already exists",
          response: "400"
      });
      newLogs.save();
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newLogs = new Logs({
          timestamp: Date.now(),
          database: "Mongo - Users",
          method: "POST",
          userID: null,
          parameters: "/register",
          response: "200"
      });
      newLogs.save();
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    const newLogs = new Logs({
        timestamp: Date.now(),
        database: "Mongo - Users",
        method: "POST",
        userID: null,
        parameters: "/login - invalid login form",
        response: "400"
    });
    newLogs.save();
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      const newLogs = new Logs({
          timestamp: Date.now(),
          database: "Mongo - Users",
          method: "POST",
          userID: null,
          parameters: "/login - email not found",
          response: "404"
      });
      newLogs.save();
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const newLogs = new Logs({
            timestamp: Date.now(),
            database: "Mongo - Users",
            method: "POST",
            userID: user.name,
            parameters: "/login - successful login attempt",
            response: "200"
        });
        newLogs.save();
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          config.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        const newLogs = new Logs({
            timestamp: Date.now(),
            database: "Mongo - Users",
            method: "POST",
            userID: user.name,
            parameters: "/login - wrong password",
            response: "400"
        });
        newLogs.save();
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get('/allusers', (req, res, next) => {
  User.find((err, data) => {
      if (err) {
        const newLogs = new Logs({
            timestamp: Date.now(),
            database: "Mongo - Users",
            method: "GET",
            userID: null,
            parameters: "/allusers",
            response: "400"
        });
        newLogs.save();
        return res.json({ success: false, error: err });
      } else {
        const newLogs = new Logs({
            timestamp: Date.now(),
            database: "Mongo - Users",
            method: "GET",
            userID: null,
            parameters: "/allusers",
            response: "200"
        });
        newLogs.save();
        return res.json({ success: true, data: data });
      }
  });
});

module.exports = router;
