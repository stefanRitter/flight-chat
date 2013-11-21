
// dependencies
var express = require('express'),
    mongoClient = require('mongodb').MongoClient,
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    app = express(),
    errorHandler = require('./routes/error').errorHandler,
    datastoreURI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/test';


// connect to database
mongoClient.connect(datastoreURI, function(err, db) {
  'use strict';
  if (err) { throw err; }

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.enable('strict routing');
  app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  
  
  // development only
  if ('development' === app.get('env')) {
    app.use(express.errorHandler());
  }
  if ('production' === app.get('env')) {
    // Error handling middleware
    app.use(errorHandler);
  }

  // routes
  routes(app, db);

  // server
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});