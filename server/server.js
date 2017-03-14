var express = require('express'),
    mongoClient = require('mongodb').MongoClient,
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    app = express(),
    socketioServer = require('./socketio_server'),
    datastoreURI = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/trybes';


// connect to database
mongoClient.connect(datastoreURI, function(err, db) {
  'use strict';
  if (err) { throw err; }

  // get session handler
  var SessionHandler = require('./routes/session'),
      sessionHandler = new SessionHandler(db),
      server = {};

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.enable('strict routing');
  app.use(express.compress());
  app.use(express.favicon(path.normalize(__dirname + '/../app/img/favicon.ico')));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.static(path.normalize(__dirname + '/../app')));
  app.use(sessionHandler.isLoggedInMiddleware);
  app.use(express.logger('dev'));
  app.use(express.errorHandler());

  // routes
  app.use(app.router);
  routes(app, db, sessionHandler);

  // server
  server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

  // chat server
  socketioServer.listen(server, db);
});
