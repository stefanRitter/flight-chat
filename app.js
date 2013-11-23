
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

  // get session handler
  var SessionHandler = require('./routes/session'),
      sessionHandler = new SessionHandler(db);

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.enable('strict routing');
  app.use(express.compress());
  app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
  
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  
  // sessions middleware
  app.use(sessionHandler.isLoggedInMiddleware);

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
  
  // development only
  if ('development' === app.get('env')) {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
  }
  if ('production' === app.get('env')) {
    app.use(express.logger('short'));
    app.use(errorHandler);
  }

  // routes
  routes(app, db, sessionHandler);

  // server
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});