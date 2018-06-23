const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
  password: {type: String, required: true},
  role: {type: Array, required: true},
  availability: {type: Array, default: []},

});

schema.methods.apiRep = function () {
  const disallowedKeys = ['password']
  const doc = this
  const user = {}

  Object.keys(doc).forEach(key => {
    if (!disallowedKeys.find(key)) {
      user[key] = doc[key]
    }
  })

  return user
}

schema.methods.showStoreInfo = function(){

}

schema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

schema.pre('save', function (next) {
  const doc = this;

  bcrypt.hash(doc.password, 10, function(err, hash) {
      if(err) return next(err)

      doc.password = hash;
      next();
  });
})

const model = mongoose.model('user', schema);

module.exports = model;
