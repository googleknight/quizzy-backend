const { handleSaveResponse } = require('../handlers/handleSaveResponse');

module.exports = [
  {
    method: 'POST',
    path: '/quizzy/saveResponse',
    handler: (request, response) => {
      const payload = JSON.parse(request.payload);
      handleSaveResponse(payload.username, payload.questionId, payload.selectedOption)
        .then((updated) => {
          response({
            message: 'Response updated',
            statusCode: 200,
          });
        })
        .catch(() => {
          response({
            data: {
              reason: 'Unable to update response',
            },
            statusCode: 500,
          });
        });
    },
  },
];
