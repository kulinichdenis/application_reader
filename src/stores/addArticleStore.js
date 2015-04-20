var Reflux = require('reflux');
var actions = require('../actions/addArticleAction.js');

var addArticleStore = Reflux.createStore({
    listenables: actions,  
    addArticle: function(result){
        this.trigger(result);      
    }  
});    

module.exports = addArticleStore;