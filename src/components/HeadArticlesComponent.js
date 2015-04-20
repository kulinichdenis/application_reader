var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions/filterAction.js');
var store = require('../stores/filterStore.js');

var ShowAllComponent = React.createClass({
    getInitialState: function () {
        return {
          status: store.status, search:""            
        }
    },
  
    componentDidMount: function() {
        this.setState({status:store.status, search:store.filter}); 
    },
    
    changeStatus:function(e){
        e.preventDefault(); 
        this.setState({status:!this.state.status});
        actions.setFilterArticles(!this.state.status, React.findDOMNode(this.refs.search).value.trim());
    },
    
    searchArticle:function(e){
        e.preventDefault();
        var val = React.findDOMNode(this.refs.search).value.trim();
        this.setState({status:this.state.status, search:val});
        actions.setFilterArticles(this.state.status, val);
    },
  
    render:function(){
    var valueSearch = this.state.search; 
    if(!this.state.status){
          var status = "SHOW UNREAD";
        } else {
          var status = "SHOW All";
        }
    
       return (
         <div>
           <div className="statusArticle"><a onClick={this.changeStatus}>{status}</a></div>               
               <div className="searchForm">
                   <input type="text" placeholder="SEARCH" ref='search' value = {valueSearch} onChange={this.searchArticle}/>    
              </div>             
        </div>
       )
    }
})

module.exports = ShowAllComponent; 