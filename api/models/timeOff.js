const mongoose = require('mongoose')

const schema = mongoose.Schema({
  user: {type: String, required: true},
  allDay: {type: Boolean, required: true},
  startTime: String,
  endTime: String,
  status: {type: String, default: "pending"},
  acceptedBy: {type: String, default: 'None'}
});

const model = mongoose.model('model', schema);

module.exports = model
