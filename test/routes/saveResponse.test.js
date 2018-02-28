const supertest = require('supertest');
const server = require('../../src/server/server');
const { handleLogin } = require('../../src/handlers/handleLogin');
const Models = require('../../models');


describe('route /quizzy/saveResponse', () => {
  describe('method POST /quizzy/saveResponse', () => {
    test('should return a 200 OK statusCode', (done) => {
      supertest(server.listener)
        .post('/quizzy/login')
        .send({
          username: 'TestUser',
          questionId: 21,
          selectedOption: 'random',
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        })
        .catch(console.log);
    });
  });
});
