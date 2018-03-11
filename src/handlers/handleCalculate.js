const Models = require('../../models');

function getTotalQuestions() {
  return Models.questions.count();
}
function getTotalCorrectResponses(username) {
  return Models.responses.findAll({
    where: {
      username,
    },
  }).then(responses => responses.map(response =>
    Models.answers.count({
      where: {
        questionId: response.questionId,
        answer: response.selectedOption,
      },
    }).then(count => count)))
    .then(all => Promise.all(all))
    .then(matchArray => matchArray.reduce((sum, current) => sum + current, 0));
}

function handleCalculate(username) {
  return getTotalCorrectResponses(username)
    .then(answer => getTotalQuestions().then(total => Models.score.findOne({
      where: {
        username,
      },
    }).then((oldscore) => {
      if (oldscore === null) {
        Models.score.create({ username, correct: answer, total });
      } else { Models.score.update({ correct: answer, total }, { where: { username } }); }
      return { answer, total };
    })));
}
module.exports = {
  handleCalculate, getTotalQuestions, getTotalCorrectResponses,
};
