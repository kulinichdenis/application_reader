var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var store = require('../stores/singleStore');

var ArticleComponent = React.createClass({ 
  
  mixins: [ Router.State, Reflux.connect(store, "article")],
  getInitialState() {
    return {
        article: {content:""}
      }
    },
    componentDidMount: function() {
       store.getArticle(this.context.router.getCurrentParams()['id']);
    },
  
    render: function () {
          var content = this.state.article['content'];
          return (
            <div>
               <div className='article'>                
                 <div dangerouslySetInnerHTML={{__html: content}}/>               
               </div>                                
            </div>
          )
    }
});
  
module.exports = ArticleComponent;  
