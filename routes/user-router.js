const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const bodyParser = require('body-parser');

const User = require('../models/user.js')

router.post('/employee', function(req, res) {
  Promise.resolve()
    .then(() => {
      return User.find({email: req.body.email})
    })
    .then((users) => {
      if(user.length >= 1) throw new Error('User already exist')

      const user = new User();
      Object.assign(user, req.body);
      user.role = ['employee'];
      return user.save();
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.toString() });
    })
})

router.post('/admin', function(req, res, next) {
  Promise.resolve()
    .then(() => {
      return User.find({email: req.body.email})
    })
    .then((users) => {
      if(user.length >= 1) throw new Error('User already exist')

      const user = new User();
      Object.assign(user, req.body);
      user.role = ['employee', 'manager'];
      return user.save();
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.toString() });
    })
})

router.delete('/:id', function(req, res, next) {
  const userTD = User.find({name: req.body.name});
  User.remove({_id: req.params.id})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User Deleted"
      })
    })
    .catch(err =>{
      return res.status(500).json({
        error: err
      });
    });
});

router.put('/edit/:id', function(req, res, next) {
  Promise.resolve()
  .then(() => {
    return User.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
  })
});

module.exports = router;
