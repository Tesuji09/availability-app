const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const User = require('../models/user.js')
const timeOff = require('../models/timeOff.js')

router.get('/', (req, res) => {
  User.find()
  .then(users => {
    res.json(users)
  })
  .catch(error => {
    res.json({ error })
  });
});

module.exports = router;
