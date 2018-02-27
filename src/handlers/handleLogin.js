const Models = require('../../models');
const rp = require('request-promise');

const ALLQUESTIONSURL = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
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

function handleLogin(userName) {
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
        return Promise.resolve(addQuestions());
      }
    });
}
module.exports = {
  handleLogin, checkUserExists, addUser, checkQuestionsExists, addQuestions,
};
