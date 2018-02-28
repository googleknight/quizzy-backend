const { handleCalculate } = require('../handlers/handleCalculate');

module.exports = [
  {
    method: 'POST',
    path: '/quizzy/score',
    handler: (request, response) => {
      // const payload = JSON.parse(request.payload);
      console.log(request.payload.username);
      handleCalculate(request.payload.username)
        .then((score) => {
          response({
            data: score,
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
