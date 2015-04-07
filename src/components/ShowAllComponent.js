var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions/actions.js');
var store = require('../stores/mainStore');

var ShowAllComponent = React.createClass({
  getInitialState: function () {
        return {
          status: store.getStatus()            
        }
    }, 
  changeStatus:function(e){
        e.preventDefault(); 
        this.setState({status:!this.state.status});
        actions.changeStatus(!this.state.status);
    },
    
   searchArticle:function(e){
      e.preventDefault();
      var val = React.findDOMNode(this.refs.search).value.trim();
      actions.searchArticle(val);
    },
  render:function(){
    
    if(!this.state.status){
          var status = "Show UNREAD";
        }else{
          var status = "Show All";
        }
    
       return (
         <div>
           <div className="statusArticle"><a onClick={this.changeStatus}>{status}</a></div>               
               <div className="searchForm">
                   <input type="text" placeholder="SEARCH" ref='search' onChange={this.searchArticle}/>    
              </div>             
        </div>
       )
    }
})

module.exports = ShowAllComponent; 