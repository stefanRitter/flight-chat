var Users = require('../db/users').Users,
    Sessions = require('../db/sessions').Sessions;

module.exports = function(db) {
  'use strict';

  var users = new Users(db),
      sessions = new Sessions(db);


  this.isLoggedInMiddleware = function(req, res, next) {
    var sessionId = req.cookies.session;
    console.log('session: ' + sessionId);

    sessions.getUser(sessionId, function(err, user) {
      if (!err && user) {
        req.user = user;
      }
      return next();
    });
  };


  this.handleLogout = function(req, res) {
    var sessionId = req.cookies.session;
    
    sessions.endSession(sessionId, function (err) {
      res.cookie('session', '');
      return res.redirect('/');
    });
  };


  this.isAuthenticated = function(req, res) {
    if (req.user) {
      res.status(200).json({user: req.user});
    } else {
      res.send(401);
    }
  };


  this.handleLoginRequest = function(req, res, next) {
    var name = req.body.name;
    console.log('user submitted: ' + name);

    users.validateLogin(name, function(err, user) {
      if (err) { return next(err); }

      sessions.startSession(user, function(err, sessionId) {
        if (err) { return next(err); }

        res.cookie('session', sessionId, { maxAge: 365 * 24 * 60 * 60 * 1000 });
        return res.json({user: {_id: user._id, name: user.name, imageUrl: user.imageUrl}});
      });
    });
  };
};
