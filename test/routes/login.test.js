const supertest = require('supertest');
const server = require('../../src/server/server');

describe('route /quizzy/login', () => {
  describe('method POST /quizzy/logins', () => {
    test('should return a 200 OK statusCode', done =>
      supertest(server.listener)
        .post('/quizzy/login')
        .send({
          username: 'Shubham',
        })
        .then((response) => {
          expect(response.body.statusCode).toBe(200);
          done();
        })
        .catch(console.log));
  });
});
