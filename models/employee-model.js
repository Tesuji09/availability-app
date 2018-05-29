const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {type: String, required: true},
  sunday: Number,
  monday: Number,
  tuesday: Number,
  wednesday: Number,
  thursday: Number,
  friday: Number,
  saturday: Number
});
