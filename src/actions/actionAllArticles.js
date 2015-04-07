var Reflux = require('reflux');
var request = require('superagent');

var Actions = Reflux.createActions([
    "getAllArticles"
])

module.exports = Actions;