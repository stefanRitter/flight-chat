module.exports = exports = function(app, db, sessionHandler) {
  'use strict';

  // homepage routes
  app.get('/', loadApp);

  // AUTHENTICATION
  // login
  app.post('/app/login', sessionHandler.handleLoginRequest);
  
  // logout!
  app.get('/app/logout', sessionHandler.handleLogout);

  // signup
  app.post('/app/signup', sessionHandler.handleSignup);

  // authenticated?
  app.get('/app/authenticated', sessionHandler.isAuthenticated);

  // 404
  app.get('*', function(req, res) { res.status(404).redirect('/'); });

  // request handlers
  function loadApp(req, res) {
    res.sendfile('../../app/index.html');
  }
};
