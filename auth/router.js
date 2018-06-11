const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

require('dotenv').config();
const router = express.Router();

const createAuthToken = function(user) {
  return jwt.sign({user}, process.env.JWT_SECRET, {
    subject: user.email,
    expiresIn: process.env.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate(
  'local',
 {session: false});
router.use(jsonParser);

router.post('/', localAuth, (req, res) => {
  const authToken = createAuthToken({
    name: req.user.name,
    email: req.user.email
  });
  res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = router;
