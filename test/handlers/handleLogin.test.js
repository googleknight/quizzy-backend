const login = require('../../src/handlers/handleLogin');
const Models = require('../../models');

beforeEach(() => Models.users.create({ username: 'TestUser' }));
afterEach(() => Models.users.destroy({ where: { username: 'TestUser' }, truncate: false, restartIdentity: true }));

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
    login.handleLogin('Shubham').then(data =>
      expect(data).toBeNull()));
});
