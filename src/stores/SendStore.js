var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actionAllArticles.js');

var Store = Reflux.createStore({
  listenables: actions, 
  
  getAllArticles: function(url){
    request.post('https://secret-spire-7828.herokuapp.com/scraper').type('form').send({url:url}).end(function(err, res){   
      this.trigger(res['text']);
    }.bind(this))
  }
  
});  

module.exports = Store;