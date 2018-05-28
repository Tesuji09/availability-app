const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const employeeRoute = require('./routes/employee-route');
const storeRoute = require('./routes/store-route')

app.use(express.static('public'));

app.use('/employee', employeeRoute);
app.use('/store', storeRoute);


app.listen(process.env.PORT || 8080);

module.exports = {app};
