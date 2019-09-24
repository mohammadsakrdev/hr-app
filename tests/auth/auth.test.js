const request = require('supertest');
const app = require('../../app');

/*
      declare the token variable in a scope accessible
      by the entire test suite
    */
let token;

beforeAll(done => {
  request(app)
    .post('/api/auth/login/')
    .send({
      userName: 'hr',
      password: '123456'
    })
    .end((err, response) => {
      token = response.body.data;
      console.log(token); // save the token!
      done();
    });
});

describe('Auth Endpoints', () => {
  it('should do login', async () => {
    const res = await request(app)
      .post('/api/auth/login/')
      .send({
        userName: 'hr',
        password: '123456'
      });
    expect(res.statusCode).toEqual(200);
  });
});

describe('Auth Endpoints', () => {
  it('should create new user', async () => {
    const res = await request(app)
      .post('/api/auth/user-register/')
      .set('Authorization', token)
      .send({
        userName: 'emp',
        fullName: 'employee',
        email: 'emp@yahoo.com',
        password: '123456',
        role: 'Employee',
        department: '5d8a6210abf19f30a0c86dbb',
        salary: 12000,
        address: 'Giza',
        manager: '5d8a6210abf19f30a0c86dba',
        phoneNumber: '01027494830',
        position: 'Assistant'
      });
    expect(res.statusCode).toEqual(201);
  });
});
