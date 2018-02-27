const login = require('../../src/handlers/handleLogin');


describe('function checkUserExists', () => {
  test('should return null as user doesnot exist in db', () =>
    login.checkUserExists('Shubham').then(data =>
      expect(data).toBeNull()));
});

describe('function handleLogin', () => {
  test('should return null as user doesnot exist in db', () =>
    login.handleLogin('Shubham').then(data =>
      expect(data).toBeNull()));
});
