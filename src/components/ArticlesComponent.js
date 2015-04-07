var React = require('react');
var Router = require('react-router');
var parseUrl = require('node-parse-url');
var {Route, DefaultRoute, RouteHandler, Link} = Router;

var actions = require('../actions/actions.js');

var ArticlesComponent = React.createClass({ 
  render: function () {
           var url = this.props.url;
           var host = parseUrl(url); 
 
           return (
           <div className='articles'> 
              <h3>{this.props.title}</h3></Link>
              <span>{this.props.text}</span>
             <div className="address">
               <a href={this.props.url}>{host.hostname}</a>
             </div>
            </div>
        )
  }
});
  
module.exports = ArticlesComponent;  
