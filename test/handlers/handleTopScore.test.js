const { handleTopScore } = require('../../src/handlers/handleTopScore');
const { handleLogin } = require('../../src/handlers/handleLogin');
const Models = require('../../models');


describe('function handleTopScore', () => {
  test('should return top 5 scorers from database', () =>
    handleLogin('TestUser6')
      .then(() => handleTopScore().then(topscores => Models.score.findAll({
        order: [['correct', 'DESC']],
        limit: 5,
      }).then((response) => {
        expect(topscores).toEqual(expect.arrayContaining(response));
      }))));
});
