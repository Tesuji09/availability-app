const chai = require('chai');
const chaiHTTP = require('chai-http');

const {app} = require('../server.js');
const expect = chai.expect;

chai.use(chaiHTTP)

describe('Login page', function() {
  it('should route to login page', function() {
    return chai.request(app)
    .get('/')
    .then(function(res) {
      expect(res).to.have.status(200);
    })
  })
})
