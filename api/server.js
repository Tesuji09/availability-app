require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
// const User = require('models/user.js')
// const router = express.Router();

const {router: AuthRouter, localStrategy, jwtStrategy} = require('./auth')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, (err) => {
  if (!err) return

  console.error(err);
  process.exit(1);
})

passport.use(localStrategy);
passport.use(jwtStrategy);

const app = express();

const userRouter = require('./routes/user');
const loginRouter = require('./auth/router');
const request = require('./routes/timeOff');

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('spa'));

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/request', request)
let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  })
  // .then(() => {
  //   const newUser = {
  //     name: 'josh',
  //     email: 'josh@yahoo.com',
  //     password: '123'
  //
  //   }
  //   const user = new User();
  //   Object.assign(user, newUser);
  //   user.role = ['employee'];
  //   return user.save();
  // });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
