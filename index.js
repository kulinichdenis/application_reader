var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 4000));

app.use(function (req, res, next) {
  if (path.extname(req.path).length > 0) {
    next();
  } else {
    req.url = '/index.html';
    next();
  }
});

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
