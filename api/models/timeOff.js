const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: {type: String, required: true},
  date: {type: String, required: true},
  allDay: {type: Boolean, required: true},
  startTime: String,
  endTime: String,
  status: {type: String, default: "pending"},
  acceptedBy: {type: String, default: 'None'}
});

const request = mongoose.model('request', schema);

module.exports = request
