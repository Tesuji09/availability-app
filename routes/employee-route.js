const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

const storeAvail = require('../models/store-model.js')
router.use(express.static('../end-employee-page'))


module.exports = router;
