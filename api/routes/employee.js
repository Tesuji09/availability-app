const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const User = require('../models/user.js');
const timeOff = require('../models/timeOff.js');

 const jwtAuth = passport.authenticate('jwt', {session: false});

 router.get('/', jwtAuth,  (req, res) => {
   console.log('We made it past the JWTAUTH!!!')
 })



module.exports = router;
