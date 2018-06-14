const {Strategy: LocalStrategy} = require('passport-local');

const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');

const User = require('../models/user');

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    session: false
  },
  (email, password, callback) => {
    // return callback(null, { username: 'john', name: 'John Doe' })

  let user;
  User.findOne({email: email})
    .then(_user => {
      user = _user;
      if(!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if(!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return callback(null, user);
    })
    .catch( err => {
      if(err.reason === 'LoginError') {
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});

const jwtStrategy = new JwtStrategy(
  {
  secretOrKey: {JWT_SECRET: process.env.JWT_SECRET},
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256']
  },
  (payload, done) => {
    done(null, payload.user);
  }
);

module.exports = {localStrategy, jwtStrategy};
