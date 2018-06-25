const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const router = express.Router();
const User = require('../models/user');

router.use(bodyParser.json());

const localAuth = passport.authenticate('local', {
   session: false,
   faiureRedirect: '../'
 });
 const jwtAuth = passport.authenticate('jwt', {session: false});

const createAuthToken = function(user) {
  return jwt.sign({user}, process.env.JWT_SECRET, {
    subject: user.email,
    expiresIn: process.env.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

router.post('/', localAuth, (req, res) => {
  const authToken = createAuthToken({
    email: req.user.email
  });
  User.findOne({ email: req.user.email })
    .then((doc) => {
      res.json({ authToken, user: doc.apiRep() });
    })
    .catch(error => {
      console.error(error)
      res.json({error: 'Cannot find user'})
    })
});

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = router;
