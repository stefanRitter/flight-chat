module.exports = exports = function(app, db, sessionHandler) {
  'use strict';

  // app
  app.get('/', loadApp);

  // login
  app.post('/app/login', sessionHandler.handleLoginRequest);
  
  // logout
  app.get('/app/logout', sessionHandler.handleLogout);

  // authenticated?
  app.get('/app/authenticated', sessionHandler.isAuthenticated);

  // 404
  app.get('*', function(req, res) { res.status(404).redirect('/'); });

  // request handler
  function loadApp(req, res) {
    res.sendfile('../../app/index.html');
  }
};
