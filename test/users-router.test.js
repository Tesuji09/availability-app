const chai = require('chai');
const chaiHTTP = require('chai-http');

const {app, runServer, closeServer} = require('../api/server.js');
const expect = chai.expect;

chai.use(chaiHTTP)


describe('/users', () => {


  it('list existing users')
  it('creates a new user')

  describe('/users/:id', () => {
    it('shows a user')
    describe('PUT request', () => {
      it('fails when there\' no auth token')
      it('fails when auth token is invalid')
      it('allows updating when auth token is valid')

      it('creates a new user when id is absent')
      it('updates a user when id is already present')
    })
    it('deletes a user')
  })

  describe('user', function() {
    const newUser = {
      name: 'josh',
      email: 'josh@yahoo.com',
      password: '123'

    }
    before(function() {
      return runServer();
    });

    // before(function(){
    //   return chai.request(app)
    //   .post('/user/employee')
    //   .send(newUser)
    // })

    after(function() {
      return closeServer();
    });

    it('should return created user', function() {
      return chai.request(app)
      .post('/user/employee')
      .send(newUser)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        const expectedKeys = ['name', 'password', 'email', 'availability', 'role'];
        expect(res).to.include.keys(expectedKeys)
      });
    })
  //   it('should return an error when trying to create a repeat user', function() {
  //     return chai.request(app)
  //     .post('/user/employee')
  //     .send(newUser)
  //     .then(function(res) {
  //       return chai.request(app)
  //       .post('/user/employee')
  //       .send(newUser)
  //       .then(function(res){
  //         expect(res).to.have.status(500)
  //       })
  //     });
  //   });
  //   it('should delete an existing employee', function () {
  //     return chai.request(app)
  //     .post('/user/employee')
  //     .send(newUser)
  //     .then(function(res) {
  //       expect(res).to.have.status(201);
  //       expect(res).to.be.json;
  //       expect(res.body).to.be.a('object');
  //       return chai.request(app)
  //       .get('/employee')
  //       .then(function(res) {
  //           return chai.request(app)
  //           .delete(`user/${res.body.id}`)
  //       })
  //       .then(function(res) {
  //         expect(res).to.have.status(204);
  //       });
  //     });
  //   });
  //   it('should edit a user', function () {
  //     return chai.request(app)
  //     .get()
  //   })
  // });
  // describe('timeOff', function() {
  //   before(function() {
  //     return runServer();
  //   });
  //
  //   after(function() {
  //     return closeServer();
  //   });
  //   it('should create a request', function () {
  //     return chai.request(app)
  //     .post()
  //   })
  });
});
