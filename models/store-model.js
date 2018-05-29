const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: {
   type: String,
   required: true,
   unique: true
  },
  password: {
   type: String,
   required: true
  },
  manager: String,
  storeName: {type: String, required: true},
  employees: [{name: {type: String, required: true},
    sunday: {type: Number, default: 0},
    monday: {type: Number, default: 0},
    tuesday: {type: Number, default: 0},
    wednesday: {type: Number, default: 0},
    thursday: {type: Number, default: 0},
    friday: {type: Number, deafault: 0},
    saturday: {type: Number, default: 0}
  }]
});

schema.methods.addEmployee(function())
