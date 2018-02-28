const login = require('./login');
const saveResponse = require('./saveResponse');
const calculate = require('./calculate');
const topScore = require('./topScore');

module.exports = [].concat(login, saveResponse, calculate, topScore);
