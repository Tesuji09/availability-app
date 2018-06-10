const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
  password: {type: String, required: true},
// Role is going to be a boolean: true for manager, and false for employee
  role: {type: Boolean, required: true},
  availability: {type: Array, default: []},

});

UserSchema.methods.showStoreInfo = function(){
  return {
    manager: this.name,
    availability: this.availability
  }
}



const store = mongoose.model('user', UserSchema)
