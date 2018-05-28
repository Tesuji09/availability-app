const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {type: String, required: true},
  sunday: {type: Number},
  monday: {type: String},
  tuesday: {type: String},
  wednesday: {type: String},
  thursday: {type: String},
  friday: {type: String},
  saturday: {type: String},
});
