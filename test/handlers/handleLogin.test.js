const login = require('../../src/handlers/handleLogin');
const Models = require('../../models');

beforeEach(() => {
  Models.users.create({ username: 'TestUser' });
});
afterEach(() => {
  Models.questions.destroy({
    where: { },
    truncate: false,
    restartIdentity: true,
  });
  Models.users.destroy({
    where: { username: 'TestUser' },
    truncate: false,
    restartIdentity: true,
  });
});


afterAll(() => Models.questions.destroy({
  truncate: false,
  restartIdentity: true,
}));

describe('function checkUserExists', () => {
  test('should return null as user doesnot exist in db', () =>
    login.checkUserExists('Shubham').then(data =>
      expect(data).toBeNull()));
  test('should return username as it exist in db', () =>
    login.checkUserExists('TestUser').then(data =>
      expect(data.username).toBe('TestUser')));
});

describe('function handleLogin', () => {
  test('should return null as user doesnot exist in db', () =>
    login.handleLogin('TestUser3').then(data =>
      expect(data.username).toBe('TestUser3')));
});

describe('function addUser', () => {
  test('adds a user and returns the user added in database', () =>
    login.addUser('TestUser2').then(data =>
      expect(data.username).toBe('TestUser2')));
});

describe('function checkQuestionsExists', () => {
  test('returns entries of questions in its table to check if it is empty', () =>
    login.checkQuestionsExists().then(data =>
      expect(data.length).toBe(0)));
});

describe('function addQuestions', () => {
  test('gets questions and options from external API and inserts into database', () =>
    login.addQuestions().then((data) => {
      Models.questions.findAll().then(Data =>
        expect(Data.length).toBeGreaterThan(0));
      Models.options.findAll().then(Data =>
        expect(Data.length).toBeGreaterThan(0));
    }));
});

describe('function addAnswers', () => {
  test('gets answers from external API for that questionId and inserts into database', () =>
    login.addAnswers().then((data) => {
      Models.answers.findAll().then(Data =>
        expect(Data.length).toBeGreaterThan(0));
    }));
});
