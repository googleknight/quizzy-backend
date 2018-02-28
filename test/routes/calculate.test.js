const supertest = require('supertest');
const server = require('../../src/server/server');


describe('route /quizzy/score', () => {
  describe('method POST /quizzy/score', () => {
    test('should return a 200 OK statusCode', (done) => {
      supertest(server.listener)
        .post('/quizzy/score')
        .send({
          username: 'TestUser',
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        })
        .catch(console.log);
    });
  });
});
