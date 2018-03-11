const calculate = require('../../src/handlers/handleCalculate');
const { handleLogin } = require('../../src/handlers/handleLogin');
const Models = require('../../models');

beforeAll((done) => {
  handleLogin('TestUser1').then(() => { done(); });
});
afterAll((done) => {
  Models.questions.destroy({
    where: { },
    truncate: false,
    restartIdentity: true,
  })
    .then(() => Models.users.destroy({
      where: { username: ['TestUser1'] },
      truncate: false,
      restartIdentity: true,
    }).then(() => { done(); }));
});

describe('function handleCalculate', () => {
  test('should return total number of questions from database', (done) => {
    calculate.getTotalQuestions()
      .then(total => Models.questions.count().then((response) => {
        expect(total).toBe(response);
        done();
      }));
  });
});

describe('function getTotalCorrectResponses', () => {
  test('should return total number of correct Responses from database', (done) => {
    calculate.getTotalCorrectResponses('TestUser1')
      .then(total => expect(total).toBe(0));
    done();
  });
});


describe('function handleCalculate', () => {
  test('should return total number of correct Responses and total questions from database', (done) => {
    calculate.handleCalculate('TestUser1')
      .then((total) => {
        expect(total.answer).toBe(0);
      });
    done();
  });
});
