var Reflux = require('reflux');
var request = require('superagent');
var tranducers = require("transducers.js");
var actions = require('../actions/filterAction.js');
var {seq, compose, map, filter} = tranducers;

var databaseStore = require('./databaseStore.js');
var parser = require('../parserHTML.js');

var filterStore = Reflux.createStore({
    listenables: actions,
    
    init: function(){       
        this.listenTo(databaseStore, this.getArticles);
        this.status = false;
        this.filter = '';
        this.articles = {};
        this.articlesAfter = {}; 
    },
  
    getArticles: function(articles){         
        this.articles = seq(articles, compose(map(kv => [kv[0],kv[1]]), map(function(x){x[1]['content'] = parser(x[1]['content']);  return x;}))); 
        if(this.filter){
            this.setFilterArticles(this.status, this.filter)
        }else{
            if(this.status){
                this.articlesAfter = this.articles;
            }else{
               this.articlesAfter = seq(this.articles, compose(map(x => [x[0],x[1]]), filter(kv => kv[1]['read'] === this.status)));
            }            
            this.trigger(this.articlesAfter);  
        }
    },

    setFilterArticles: function(status, search){
      
        this.filter = search.toLowerCase();
        this.status = status;
        if(this.status){
            this.articlesAfter = seq(this.articles, compose(map(x => [x[0],x[1]]), filter(kv=> kv[1]['title'].toLowerCase().indexOf(this.filter) !==             -1)))
            this.trigger(this.articlesAfter);  
        }else{
            this.articlesAfter = seq(this.articles, compose(map(x => [x[0],x[1]]), filter(kv=> kv[1]['title'].toLowerCase().indexOf(this.filter) !==             -1), filter(kv=> kv[1]['read'] === status)));
            this.trigger(this.articlesAfter);  
      }

    }
    
});

module.exports = filterStore;        