const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

const User = require('../models/user.js')

router.post('/employee', function(req, res, next) {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length >= 1) {
        return res.status(409).json({
          message: 'email already exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            if(err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                name: req.body.name,
                //Role is always false because we are creating employees
                role: false,
                password: hash
              });
            }
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201);
                })
                .catch(err =>{
                  return res.status(500).json({
                    error: err
                  });
                });
          // No availability provided because the employee sets the availability
        });
      }
    });
})

router.post('/admin', function(req, res, next) {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length >= 1) {
        return res.status(409).json({
          message: 'email already exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            if(err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                name: req.body.name,
                //Role is true for Admin
                role: true,
                password: hash
              });
            }
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201);
                })
                .catch(err =>{
                  return res.status(500).json({
                    error: err
                  });
                });
          // No availability provided because the employee sets the availability
        });
      }
    });
})

router.post('/login', function(req, res, next) {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Email or Password is incorrect'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, res) => {
        if (err) {
          return res.status(401).json({
            message: 'Email or Password is incorrect'
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            uderId: user[0]._id
          }, process.env.JWT_KEY,
          {
              expiresIn: "1h"
          });
          return res.status(200).json({
            message: 'auth successful',
            token: token
          }, );
        }
        res.status(401).json({
          message: 'Auth Failed'
        });
      });
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

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


module.exports = router;
