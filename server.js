const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

const userRoute = require('./routes/user-route')

app.use(express.static('public'));

app.use('/store', userRoute);


app.listen(process.env.PORT || 8080);

module.exports = {app};
