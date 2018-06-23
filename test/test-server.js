const chai = require('chai');
const chaiHTTP = require('chai-http');

const {app, runServer, closeServer} = require('../api/server.js');
const expect = chai.expect;

chai.use(chaiHTTP)


describe('Availability', () => {
  describe('create user', function() {
    const newUser = {
      name: 'josh',
      email: 'josh@yahoo.com',
      password: '123'

    }
    before(function() {
      return runServer();
    });

    after(function() {
      return closeServer();
    });

    it('should return created user', function() {
      return chai.request(app)
      .post('/createUser/employee')
      .send(newUser)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');

      });
    });
    it('should return an error', function() {
      return chai.request(app)
      .post('/createUser/employee')
      .send(newUser)
      .then(function(res) {
        expect(res).to.have.status(500)
      })
    })
  })
})
