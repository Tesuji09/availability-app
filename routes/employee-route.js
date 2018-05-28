const express = require('express')
const router = express.router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

const storeAvail = require('../models/employee-model.js')



module.exports = router;
