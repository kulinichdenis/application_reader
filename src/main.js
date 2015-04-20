var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;

var Application = require('./components/AppComponent');
var DefaultPage = require('./components/ContainerComponent');
var Article = require('./components/ArticleComponent');

  var routes = (
  <Route path='/' handler={Application}>   
    <DefaultRoute name="default" handler={DefaultPage} />
    <Route name="article" path=":id" handler={Article} /> 
  </Route>
    );

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
}); 


