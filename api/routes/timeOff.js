const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Request = require('../models/timeOff.js')

 const jwtAuth = passport.authenticate('jwt', {session: false});

router.post('/',(req, res) => {
  Promise.resolve()
  .then(() => {
    const request = new Request();
    Object.assign(request, req.body)
    return request.save();
  })
  .then((request)=>{
    res.status(201);
  })
  .catch(error => {
    console.error(error)
    res.status(500)
  })
})

module.exports = router;
