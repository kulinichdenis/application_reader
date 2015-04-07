var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var store = require('../stores/singleStore.js');
var actions = require('../actions/actions.js');
var store = require('../stores/singleStore');

var ShowArticleComponent = React.createClass({
  
  getInitialState() {
    return {
        status: {} 
      }
   },
   mixins: [Router.State, Reflux.listenTo(store,"onStatusChange")],  
   onStatusChange: function(status) {
        this.setState({
            status: status
        });
   },
  
  deleteArticle: function(e){
    e.preventDefault();  
    actions.removeArticle(this.context.router.getCurrentParams()['id']);  
    this.context.router.transitionTo('/');
  },
  
  changeStatus: function(e){
    e.preventDefault();
    this.setState({status: {read:!this.state.status['read']}});
    actions.readArticle(this.context.router.getCurrentParams()['id'], !this.state.status['read']);

  },
  
  render:function(){
    var status = '';
    if(this.state.status['read'] === undefined){
      status = '';
    }else{
      if(this.state.status['read']){
        status = "Read";
      }else{
        status = "UnRead";
      }  
    }
    return (
       <div>  
          <div className='delete'><a onClick={this.deleteArticle}>Delete</a></div>             
          <div className='readStatus'><a onClick={this.changeStatus}>{status}</a></div>
       </div>
    )
    }
})

module.exports = ShowArticleComponent; 