var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var parseUrl = require('node-parse-url');


var {Route, DefaultRoute, RouteHandler, Link} = Router;
var actions = require('../actions/databaseAction.js');
var Store = require('../stores/addArticleStore.js');

var HeadArticlesComponent = require('./HeadArticlesComponent.js');
var HeadArticleComponent = require('./HeadArticleComponent.js');


var AppComponent = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  
  getInitialState:function(){
    return {
      statusRequest: ''
    }
  },  
  
  mixins: [Reflux.listenTo(Store, 'resetForm')],
    handleSubmit:function(e){
      e.preventDefault();
      var url = React.findDOMNode(this.refs.url).value.trim();
      actions.addArticle(url);
    },
  
    goToHome: function(){
      this.context.router.transitionTo('/');  
    },
  
    resetForm: function(val){
      this.setState({statusRequest:val});
      setTimeout((function(){
      this.setState({statusRequest:''});
      this.refs.url.getDOMNode().value = '';        
    }).bind(this),2000);

    },
      
    render: function () {  
      var component; 
      var addStatus = "";
      var className;
      
      if(this.state.statusRequest === 'OK' && this.state.statusRequest){
          className = 'good';
          addStatus = "GOOD";
      }else if(this.state.statusRequest){
          className = 'error';
          addStatus = "ERROR";
      }
      
      if(this.context.router.getCurrentParams()['id']){
          component = <HeadArticleComponent />;
        }else{
          component = <HeadArticlesComponent />;
      }
        
      return ( 
        <div>
            <div className={className}>
                <p>{addStatus}</p>
            </div> 
            <div className="container">
          
             <div className="home">
               <a onClick={this.goToHome}>Read Now</a>
             </div> 
             <div className="form">                                                     
               <form onSubmit={this.handleSubmit}>
                 <input type="text" placeholder="INSERT URL" ref='url'/>
                 <input type="submit" value="SEND" />
               </form>       
             </div>           
                {component}
              </div>
                <RouteHandler/>
                <div className="bookmark">
                  <a href="javascript:(function(){
                  function e(e,t){
                    var n=document.createElement('div');
                    n.id='__READABILITY_APP_FLASH__';
                    n.style.width='100%';
                    n.style.position='fixed';
                    n.style.zIndex=99999;
                    n.style.color='white';
                    n.style.fontSize='18px';
                    n.style.textAlign='center';
                    n.style.padding='20px 0';
                    n.style.fontFamily='\'Open Sans\', Helvetica, Arial, sans-serif';
                    n.innerHTML=t;
                    n.style.background=e===errorTitle.SUCCESS?'green':'red';
                    document.body.insertBefore(n,document.body.childNodes[0]),setTimeout(function() {
                       document.body.removeChild(n)},3500)
                    };
                    var urllocal = document.location.href;
                    var errorTitle = {SUCCESS:'SUCCESS',ERROR:'ERROR'}; 
                   
                    if(urllocal.indexOf('reader-kulinichdenis.herokuapp.com') === -1){
                     
                      var t = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
                      t.onreadystatechange=function(){ 
                         t.readyState === 4&&(200 === t.status?e(errorTitle.SUCCESS, 'Item has been successfully added'):
                         e(errorTitle.ERROR,'Sorry, something went wrong. '+t.statusText))
                      };

                      t.open('POST','https://secret-spire-7828.herokuapp.com/scraper', true);
                      t.setRequestHeader('Content-type','application/x-www-form-urlencoded');  
                      t.send('url='+urllocal);
                    } else{
                      e(errorTitle.ERROR,'The same url with base domain.');
                    };
                    })()">BookMarklet</a>
            </div>
         </div> 
        )
    }
})

module.exports = AppComponent;


