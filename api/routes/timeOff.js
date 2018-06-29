const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Request = require('../models/timeOff.js')

 const jwtAuth = passport.authenticate('jwt', {session: false});

router.post('/',(req, res) => {
// console.log('employee-post')
// res.json({message: 'we made it into the employee post method'})
  Promise.resolve()
  .then(() => {
    const request = new Request();
    Object.assign(request, req.body)
    console.log(request);
    return request.save();
  })
  .then((request)=>{
    res.status(201).json({message: 'data uploaded'});
  })
  .catch(error => {
    console.error(error)
    res.status(500).json({message: 'data uploaded'})
  })
})

router.put('/', (req, res) => {
  Promise.resolve()
  .then(() => {
    Request.findOneAndUpdate({_id: req.body.id}, {$set: {"status": req.body.status}})
  })
  .then((data) => {
    res.json({ updated: data })
  })
  .catch(error => {
    console.error(error)
    res.json({ message: "Error: Data not updated" })
  })
})

module.exports = router;
