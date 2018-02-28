const { handleLogin } = require('../handlers/handleLogin');

module.exports = [
  {
    method: 'POST',
    path: '/quizzy/login',
    handler: (request, response) => {
      console.log(request.payload);
      handleLogin(request.payload.username).then((allQuestionsData) => {
        response({
          data: allQuestionsData,
          statusCode: 200,
        });
      })
        .catch(() => {
          response({
            data: {
              reason: 'Unable to retrieve questions and your responses.',
            },
            statusCode: 500,
          });
        });
    },
  },
];
