const login = require('../../src/handlers/handleLogin');
const Models = require('../../models');

beforeEach((done) => {
  Models.users.create({ username: 'TestUser' }).then(() => { done(); });
});
afterEach((done) => {
  Models.questions.destroy({
    where: { },
    truncate: false,
    restartIdentity: true,
  }).then(() => {
    Models.users.destroy({
      where: { username: ['TestUser', 'TestUser2', 'TestUser3'] },
      truncate: false,
      restartIdentity: true,
    }).then(() => { done(); });
  });
});


describe('function checkUserExists', () => {
  test('should return null as user doesnot exist in db', (done) => {
    login.checkUserExists('Shubham').then(data =>
      expect(data).toBeNull());
    done();
  });
  test('should return username as it exist in db', (done) => {
    login.checkUserExists('TestUser').then(data =>
      expect(data.username).toBe('TestUser'));
    done();
  });
});

describe('function handleLogin', () => {
  test('should add user in database and give formatted response', (done) => {
    login.handleLogin('TestUser3').then(data =>
      expect(data.length).toBeGreaterThan(0));
    done();
  });
});

describe('function addUser', () => {
  test('adds a user and returns the user added in database', (done) => {
    login.addUser('TestUser2').then(data =>
      expect(data.username).toBe('TestUser2'));
    done();
  });
});

describe('function checkQuestionsExists', () => {
  test('returns entries of questions in its table to check if it is empty', (done) => {
    login.checkQuestionsExists().then(data =>
      expect(data.length).toBe(0));
    done();
  });
});

describe('function addQuestions', () => {
  test('gets questions and options from external API and inserts into database', (done) => {
    login.addQuestions().then((data) => {
      Models.questions.findAll().then(Data =>
        expect(Data.length).toBeGreaterThan(0));
      Models.options.findAll().then(Data =>
        expect(Data.length).toBeGreaterThan(0));
    });
    done();
  });
});

describe('function addAnswers', () => {
  test('gets answers from external API for that questionId and inserts into database', (done) => {
    login.addQuestions().then(() => login.addAnswers().then((data) => {
      Models.answers.findAll().then(Data =>
        expect(Data.length).toBeGreaterThan(0));
    }));
    done();
  });
});

describe('function getResponse', () => {
  test('gets formatted response from various tables', (done) => {
    login.getResponse('TestUser').then((data) => {
      expect(data.length).toBe(0);
    });
    done();
  });
});
