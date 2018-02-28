const login = require('./login');
const saveResponse = require('./saveResponse');
const calculate = require('./calculate');

module.exports = [].concat(login, saveResponse, calculate);
