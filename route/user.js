const express = require('express');
const bodyParser = require('body-parser');

const user = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../controller/user');

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended: false }));

// userLogin
user.post('/sign-up', asyncHandler((req, res) => controller.userSignUp(req, res)));

// adminLogin
user.post('/sign-in', asyncHandler((req, res) => controller.userSignIn(req, res)));

module.exports = user;
