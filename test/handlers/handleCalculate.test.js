const calculate = require('../../src/handlers/handleCalculate');
const { handleLogin } = require('../../src/handlers/handleLogin');
const Models = require('../../models');

// beforeAll(() => {
//   Promise.resolve();
// });


describe('function handleTopScore', () => {
  test('should return top 5 scorers from database', done =>
    handleLogin('TestUser')
      .then(() => calculate.getTotalQuestions('TestUser')
        .then(total => Models.questions.count().then((response) => {
          expect(total).toBe(response);
          done();
        }))));
});
