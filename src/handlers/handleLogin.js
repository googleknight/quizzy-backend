const Models = require('../../models');

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

function handleLogin(userName) {
  return checkUserExists(userName)
    .then((user) => {
      if (user === null) {
        return Promise.resolve(addUser(userName));
      }
      return user;
    })
    .then(() => checkQuestionsExists());
}
module.exports = {
  handleLogin, checkUserExists, addUser, checkQuestionsExists,
};
