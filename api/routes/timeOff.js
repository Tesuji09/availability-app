const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const timeOffRequests = require('../models/timeOff.js')

 const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/', jwtAuth, (req, res) => {

})

module.exports = router;
