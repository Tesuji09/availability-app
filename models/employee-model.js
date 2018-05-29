const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {type: String, required: true},
  sunday: {type: Number},
  monday: {type: Number},
  tuesday: {type: Number},
  wednesday: {type: Number},
  thursday: {type: Number},
  friday: {type: Number},
  saturday: {type: Number},
});
