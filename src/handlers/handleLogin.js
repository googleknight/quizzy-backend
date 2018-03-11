const Models = require('../../models');
const rp = require('request-promise');

const ALLQUESTIONSURL = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
const ANSWERURL = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';
function checkUserExists(userName) {
  return Models.users.findOne({
    where: {
      username: userName,
    },
  });
}

function addUser(userName) {
  return Models.users.create({ username: userName });
}

function checkQuestionsExists() {
  return Models.questions.findAll();
}

function addQuestions() {
  return rp.get(ALLQUESTIONSURL)
    .then((allQuestionsData) => {
      const { allQuestions } = JSON.parse(allQuestionsData);
      return allQuestions.map(question => Models.questions.create({
        questionId: question.questionId,
        statement: question.question,
      })
        .then(() => {
          const options = Object.values(question).slice(2);
          return options.map(option =>
            Models.options.create({
              questionId: question.questionId,
              option,
            }));
        }));
    })
    .then(allPromises => Promise.all(allPromises));
}
function addAnswers() {
  return Models.questions.findAll({
    attributes: ['questionId'],
  })
    .then(questionIds =>
      questionIds.map(questionId =>
        rp.get(ANSWERURL + questionId.questionId)
          .then((answer) => {
            const correctAnswer = JSON.parse(answer).answer;
            return Models.answers.create({
              questionId: questionId.questionId,
              answer: correctAnswer,
            });
          })));
}

function getResponse(userName) {
  return Models.questions.findAll({
    order: ['questionId'],
  })
    .then(questions =>
      questions.map(question =>
        Models.responses.findOne({
          attributes: ['selectedOption'],
          where: { questionId: question.questionId, username: userName },
        })
          .then(response =>
            Models.options.findAll({
              where: { questionId: question.questionId },
            })
              .then((options) => {
                const allOptions = options.map(optionElement =>
                  optionElement.option);
                return {
                  questionId: question.questionId,
                  statement: question.statement,
                  options: allOptions,
                  response: response !== null ? response.selectedOption : '',
                };
              }))));
}

function handleLogin(userName) {
  if (userName.length !== 0) {
    return checkUserExists(userName)
      .then((user) => {
        if (user === null) {
          return Promise.resolve(addUser(userName));
        }
        return user;
      })
      .then(() => checkQuestionsExists())
      .then((questions) => {
        if (questions.length === 0) {
          return Promise.resolve(addQuestions())
            .then(data => addAnswers())
            .then(allPromises => Promise.resolve(allPromises));
        }
        return questions;
      })
      .then(allResponses => getResponse(userName))
      .then(allPromises => Promise.all(allPromises));
  }
}
module.exports = {
  handleLogin,
  checkUserExists,
  addUser,
  checkQuestionsExists,
  addQuestions,
  addAnswers,
  getResponse,
};
