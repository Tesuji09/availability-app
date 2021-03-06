const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')

const bodyParser = require('body-parser');

const User = require('../models/user.js')
const Awesome = {
  jwtAuth: passport.authenticate('jwt', {session: false})
};

const smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'csgopedagogy@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
        expires: 1484314697598
    }
});


router.post('/employee', Awesome.jwtAuth, function(req, res) {
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

router.delete('/delete/:id', Awesome.jwtAuth, function(req, res, next) {
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
  User.findById(req.body.id)
    .then(user => {

      const mailOptions = {
        from: "csgopedagogy@gmail.com",
        to: "neveragain8209@yahoo.com",
        subject: "Hello",
        generateTextFromHTML: true,
        html: `<b>${user.name} has updated their availability</b>`
      };

      smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log(response);
        }
        smtpTransport.close();
      });
      return User.findOneAndUpdate({_id: req.body.id}, {$set: { availability: req.body.availability }})
    })
    .then((user) => {
        res.status(200).json({
          message: 'user updated',
          user: user.apiRep()
        })
    })
    .catch((err) => {
      res.status(500).json({ message: err.toString() });
    });
});

router.put('/edit/password', function(req, res) {
  User.findById(req.body.id)
    .then(user => {
      console.log(user);
      user.password = req.body.password;
      return user.save();
    })
    .then((user) => {
        res.status(200).json({
          message: 'user updated',
          user: user.apiRep()
        })
    })
    .catch((err) => {
      res.status(500).json({ message: err.toString() });
    });
});

router.get('/store', Awesome.jwtAuth, (req, res) => {
  User.find()
  .then((users) => {
    const rep = users.map(user => user.apiRep())
    console.log(rep)
    res.json({allUsers:rep})
  })
  .catch(error => {
    res.status(500).json({ error })
  });
});

router.get('/employee/:id', Awesome.jwtAuth, (req, res) => {
  User.findOne({_id: req.params.id})
  .then((user) => {
      res.json({message: 'token is valid'})
  })
  .catch(error => {
    res.status(500).json({ error })
  });
});


module.exports = router;
