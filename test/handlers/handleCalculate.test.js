const calculate = require('../../src/handlers/handleCalculate');
const { handleLogin } = require('../../src/handlers/handleLogin');
const Models = require('../../models');

// beforeAll(() => {
//   Promise.resolve();
// });


describe('function handleCalculate', () => {
  test('should return total number of questions from database', done =>
    handleLogin('TestUser')
      .then(() => calculate.getTotalQuestions('TestUser')
        .then(total => Models.questions.count().then((response) => {
          expect(total).toBe(response);
          done();
        }))));
});

describe('function getTotalCorrectResponses', () => {
  test('should return total number of correct Responses from database',  =>
    handleLogin('TestUser')
      .then(() => calculate.getTotalCorrectResponses('TestUser')
        .then(total => 
          expect(total).toBe(0))))
});
