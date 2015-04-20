var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/databaseAction.js');
var actionArticle = require('../actions/addArticleAction.js');

var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://readerkulinich.firebaseio.com/");

var databaseStore = Reflux.createStore({
    listenables: actions,
    init: function(){       
        myFirebaseRef.child('articles').on('value', function(snapshot) {  

            var obj = snapshot.val();
            this.trigger(obj);
        }.bind(this))
    },
    
    deleteArticle: function(article){
        myFirebaseRef.child('articles').child(article).remove();
    },
    
    updateStatusRead: function(article, status){
        myFirebaseRef.child('articles').child(article).update({ read: status });
    },
    
    addArticle: function(address){
        request.post('https://secret-spire-7828.herokuapp.com/scraper').type('form')
              .send({url:address})
              .end(function(err, res){   
                  actionArticle.addArticle(res['text'] || "");

        }.bind(this));
    }
   
});

module.exports = databaseStore;        