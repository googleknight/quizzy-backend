const supertest = require('supertest');
const server = require('../../src/server/server');

describe('route /quizzy/topScores', () => {
  describe('method GET /quizzy/topScores', () => {
    test('should return a 200 OK statusCode', (done) => {
      supertest(server.listener)
        .get('/quizzy/topScores')
        .then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        })
        .catch(console.log);
    });
  });
});
