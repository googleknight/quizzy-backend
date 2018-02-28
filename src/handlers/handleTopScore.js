const Models = require('../../models');

function handleTopScore() {
  return Models.score.findAll({
    order: [['correct', 'DESC']],
    limit: 5,
  });
}
module.exports = {
  handleTopScore,
};
