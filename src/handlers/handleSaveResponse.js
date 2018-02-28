const Models = require('../../models');

function handleSaveResponse(username, questionId, selectedOption) {
  return Models.responses.findOne({
    where: {
      username,
      questionId,
      selectedOption,
    },
  }).then((response) => {
    if (response === null) {
      Models.responses.findOne({
        where: {
          username,
          questionId,
        },
      }).then((savedResponse) => {
        if (savedResponse === null) {
          Models.responses.create({
            username,
            questionId,
            selectedOption,
          });
        } else {
          Models.responses.update({
            username,
            questionId,
            selectedOption,
          }, {
            where: {
              username,
              questionId,
            },
          });
        }
      });
    }
  });
}
module.exports = {
  handleSaveResponse,
};
