var Reflux = require('reflux');
var request = require('superagent');
var Actions = Reflux.createActions([ 
    "toArticle",
    "searchArticle",
    "changeStatus",
    "removeArticle",
    "readArticle"
]);

module.exports = Actions;

