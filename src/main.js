var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;

var App = require('./components/AppComponent');
var Main = require('./components/MainComponent');
var Article = require('./components/ArticleComponent');

function renderApp() {
  var routes = (
  <Route handler={App}>   
    <DefaultRoute name="page1" handler={Main} />
    <Route name="page2" path=":id" handler={Article} /> 
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
}); 
}

(function() {
  renderApp();
})();
