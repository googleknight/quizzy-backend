const Models = require('../../models');

function checkUserExists(userName) {
  return Models.users.findOne({
    where: {
      username: userName,
    },
  });
}
function handleLogin(userName) {
  return checkUserExists(userName);
}
module.exports = { handleLogin, checkUserExists };
