const { handleSaveResponse } = require('../../src/handlers/handleSaveResponse');
const { handleLogin } = require('../../src/handlers/handleLogin');
const Models = require('../../models');

// beforeAll(() => {
//   Promise.resolve();
// });

afterAll(() => {
//   Models.users.destroy({
//     where: { username: ['TestUser'] },
//     truncate: false,
//     restartIdentity: true,
//   });
//   Models.questions.destroy({
//     where: { username: ['TestUser'] },
//     truncate: false,
//     restartIdentity: true,
//   });
//   Models.responses.destroy({
//     where: { username: ['TestUser'] },
//     truncate: false,
//     restartIdentity: true,
//   });
//   Models.answers.destroy({
//     where: { username: ['TestUser'] },
//     truncate: false,
//     restartIdentity: true,
//   });
//   Models.options.destroy({
//     where: { username: ['TestUser'] },
//     truncate: false,
//     restartIdentity: true,
//   });
});

describe('function handleSaveResponse', () => {
  test('should updates response in database', () =>
    handleLogin('TestUser')
      .then(() => handleSaveResponse('TestUser', 89, 'Majuro').then(data =>
        Models.responses.findOne({
          where: { username: 'TestUser', questionId: 89, selectedOption: 'Majuro' },
        }).then((response) => {
          console.log(response);
          expect(response.selectedOption).toBe('Majuro');
        }))));
});
