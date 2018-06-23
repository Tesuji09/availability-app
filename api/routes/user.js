const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');

const User = require('../models/user.js')

router.post('/employee', function(req, res) {
  Promise.resolve()
    .then(() => {
      return User.find({email: req.body.email})
    })
    .then((users) => {
      if(users.length >= 1) return new Error('User already exist');

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
      if(user.length >= 1) throw new Error('User already exist');

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
    User.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
  })
  .then((user) => {
      res.status(200).json({
        message: 'user updated',
        user: user
      })
  })
  .catch((err) => {
    res.status(500).json({ message: err.toString() });
  });
});

router.put('/edit/password/:id')

module.exports = router;
