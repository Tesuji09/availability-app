require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const {router: AuthRouter, localStrategy, jwtStrategy} = require('./auth')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, (err) => {
  if (!err) return

  console.error(err);
  process.exit(1);
})

const app = express();

const userRouter = require('./routes/user-router');
const loginRouter = require('./auth/router');

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/login', loginRouter);
app.use('/store', userRouter);


app.listen(process.env.PORT || 8080);

module.exports = {app};
