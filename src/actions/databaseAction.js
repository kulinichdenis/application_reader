var Reflux = require('reflux');

var Actions = Reflux.createActions([ 
    "updateStatusRead",
    "deleteArticle",
    "addArticle"
]);

module.exports = Actions;

