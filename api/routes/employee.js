const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const User = require('../models/user.js');
const timeOff = require('../models/timeOff.js');

 const jwtAuth = passport.authenticate('jwt', {session: false});

 router.post('/',  (req, res) => {
   User.find(req.header)
 })



module.exports = router;
