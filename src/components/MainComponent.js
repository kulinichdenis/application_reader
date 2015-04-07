var React = require('react');
var Reflux = require('reflux');
var store = require('../stores/mainStore');
var ArticlesComponent = require('./ArticlesComponent');


var MainComponent = React.createClass({
    mixins: [Reflux.connect(store, "list")],
  
    componentDidMount: function() {
       this.setState({list:store.getFilterStore()});
    },  
    getInitialState() {
      return {
        list: {}
      }
    }, 
    render: function () { 
     var htmlContent = [];    
     var list = this.state.list; 

      for(var keys in list) {
         htmlContent.push(<ArticlesComponent text={list[keys]['content']} id={keys} title={list[keys]['title']} url={list[keys]['url']} key={keys}/>);
      }
      return (
            <div>                                      
                <div className='mainArticles'>       
                   {htmlContent}     
                </div>                
            </div>
        )
    }
})
 
module.exports = MainComponent;
