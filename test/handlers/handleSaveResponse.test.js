const { handleSaveResponse } = require('../../src/handlers/handleSaveResponse');
const { handleLogin } = require('../../src/handlers/handleLogin');
const Models = require('../../models');

// // beforeAll(() => {
// //   Promise.resolve();
// // });

// afterAll((done) => {
//   Models.users.destroy({
//     where: { username: ['TestUser5'] },
//     truncate: false,
//     restartIdentity: true,
//   }).then(() =>
//     Models.questions.destroy({
//       where: { },
//       truncate: false,
//       restartIdentity: true,
//     })).then(() =>
//     Models.responses.destroy({
//       where: { username: ['TestUser5'] },
//       truncate: false,
//       restartIdentity: true,
//     })).then(() =>
//     Models.answers.destroy({
//       where: { },
//       truncate: false,
//       restartIdentity: true,
//     }))
//     .then(() =>
//       Models.options.destroy({
//         where: { },
//         truncate: false,
//         restartIdentity: true,
//       }))
//     .then(() => { done(); });
// });

describe('function handleSaveResponse', () => {
  test('should updates response in database', (done) => {
    handleLogin('TestUser5')
      .then(() => handleSaveResponse('TestUser5', 67, 'Majuro').then(data =>
        Models.responses.findOne({
          where: { username: 'TestUser5', questionId: 67, selectedOption: 'Majuro' },
        }).then((response) => {
          expect(response.selectedOption).toBe('Majuro');
        })));
    done();
  });
});
