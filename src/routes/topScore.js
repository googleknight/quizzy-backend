const { handleTopScore } = require('../handlers/handleTopScore');

module.exports = [
  {
    method: 'GET',
    path: '/quizzy/topScores',
    handler: (request, response) => {
      handleTopScore()
        .then((score) => {
          response({
            data: score,
            statusCode: 200,
          });
        })
        .catch(() => {
          response({
            data: {
              reason: 'Unable to get scores',
            },
            statusCode: 500,
          });
        });
    },
  },
];
