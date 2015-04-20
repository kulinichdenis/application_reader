var Reflux = require('reflux');
var Firebase = require("firebase");
var htmlparser = require("htmlparser2");
var tranducers = require("transducers.js");
var actions = require('../actions/actions.js');
var myFirebaseRef = new Firebase("https://readerkulinich.firebaseio.com/");
var {reduce, transformer, toArray, toObj, toIter, iterate, push, merge, empty,
      transduce, seq, into, compose, map, filter, remove,
      cat, mapcat, keep, dedupe, take, takeWhile,
      drop, dropWhile, partition, partitionBy, protocols} = tranducers;

var _articleStore = {};
var statusRead = false;
var _articleFilterStore = {};

function par(textParse){
   if(!textParse) return;
   var stringText = "";
   var parser = new htmlparser.Parser({
    ontext: function(text){
        stringText += text;
    }
   
}, {decodeEntities: true});
  var step = 300;
  var s = 0;
  var n = 400; 
  while(stringText.length < step){ 
    parser.write(textParse.substring(s,n));
    s += n;
    n += step;    
  }
parser.end();

  return stringText.substring(0,300)+" ....";
}

var Store = Reflux.createStore({
    listenables: actions,
    getInitialState: function(){       
      myFirebaseRef.child('articles').on('value', function(snapshot) {  
        var articles = {};
        var obj = snapshot.val(); 
       
    articles = seq(obj, compose(map(kv => [kv[0],kv[1]]), map(function(x){x[1]['content'] = par(x[1]['content']);  return x;}))); 
      
        _articleStore = articles;
        
          if(!statusRead){
             _articleFilterStore = seq(articles,compose(map(x => [x[0],x[1]]), filter(kv => kv[1]['read'] === statusRead)));
             this.trigger(_articleFilterStore); 
          }else{
             _articleFilterStore = articles;
             this.trigger(articles);
          }
        
      }.bind(this), function (errorObject) {
          console.log("The read failed: " + errorObject.code);
      });
    },
    
    searchArticle: function (value) {  
      var searchArray = {};       
      if(statusRead){
          searchArray = seq(_articleStore, compose(map(x => [x[0],x[1]]), filter(kv => kv[1]['title'].indexOf(value) !== -1))); 
          this.trigger(searchArray);  
      } else {
          searchArray = seq(_articleStore, compose(map(x => [x[0],x[1]]), filter(kv=> kv[1]['title'].indexOf(value) !== -1), filter(kv=> kv[1]['read'] === statusRead)));
          this.trigger(searchArray);
      }
    }, 
    
    changeStatus:function(status){
       statusRead = status;

      if(status){
        this.trigger(_articleStore); 
      }else{
        this.trigger(seq(_articleStore, compose(map(x => [x[0],x[1]]), filter(kv=> kv[1]['read'] === statusRead)))); 
      }
    },
  
    removeArticle:function(val){
       myFirebaseRef.child('articles').child(val).remove();
    },
  
    readArticle:function(val,status){
       myFirebaseRef.child('articles').child(val).update({ read: status });
    },  
    
    getStatus: function () {
        return statusRead;
    },
  
    getArticle: function(){
      return _articleStore;
    },
  
    getFilterStore: function(){
      return _articleFilterStore;
    }
});

module.exports = Store;

