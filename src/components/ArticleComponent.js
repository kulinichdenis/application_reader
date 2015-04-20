var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var store = require('../stores/singleStore');
var actions = require('../actions/databaseAction.js');
var parseUrl = require('node-parse-url');

var ArticleComponent = React.createClass({ 
  
  mixins: [ Router.State, Reflux.connect(store, "article")],
  getInitialState() {
    return {
        article: {content:"", title:"", url:"."}
      }
    },
  componentDidMount: function() {
       store.getArticle(this.context.router.getCurrentParams()['id']);
  },
  
  render: function () {
      var content = this.state.article['content'];
      var title = this.state.article['title'];
      var url = this.state.article['url'];  
      var host = parseUrl(url);   
   
     
      return (
          <div>
              <div className='article'>                
                  <div className="hostname">SOURCE  <a href={url}>{host.hostname}</a></div>
                  <div className="titleName"><h2>{title}</h2></div>
                  <div dangerouslySetInnerHTML={{__html: content}}/>               
              </div>                                
          </div>
       )
  }
});
  
module.exports = ArticleComponent;  
