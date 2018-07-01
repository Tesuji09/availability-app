const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const bodyParser = require('body-parser');

const User = require('../models/user.js')
const jwtAuth = passport.authenticate('jwt', {session: false});


router.post('/employee', jwtAuth, function(req, res) {
  console.log('employee endpoint')
  Promise.resolve()
    .then(() => {
      return User.find({email: req.body.email})
    })
    .then((users) => {
      if(users.length >= 1) throw new Error('User already exist');

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

router.delete('/delete/:id', jwtAuth, function(req, res, next) {
  console.log(req.params.id)
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

router.put('/edit', function(req, res) {
  console.log(req.body.availability)
  User.findOneAndUpdate({_id: req.body.id}, {$set: { availability: req.body.availability }})
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

router.get('/store', jwtAuth, (req, res) => {
  User.find()
  .then((users) => {
    const rep = users.map(user => user.apiRep())
    console.log(rep)
    res.json({users:rep})
  })
  .catch(error => {
    res.status(500).json({ error })
  });
});

// router.get('/employee', (req, res) => {
//   User.findOne({_id: req.headers.email.})
//   .then((users) => {
//     const rep = users.map(user => user.apiRep())
//     console.log(rep)
//     res.json({users:rep})
//   })
//   .catch(error => {
//     res.status(500).json({ error })
//   });
// });

router.put('/edit/password/:id')

module.exports = router;
