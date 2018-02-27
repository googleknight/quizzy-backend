const { handleLogin } = require('../handlers/handleLogin');

module.exports = [
  {
    method: 'POST',
    path: '/quizzy/login',
    handler: (request, response) => {
      handleLogin(request.payload.username).then((allQuestionsData) => {
        response({
          data: 'some data',
          statusCode: 200,
        });
      })
        .catch(() => {
          response({
            data: {
              reason: 'Unable to retrieve questions and your.',
            },
            statusCode: 500,
          });
        });
    },
  },
];
