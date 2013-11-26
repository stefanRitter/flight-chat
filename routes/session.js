var UsersDAO = require('../db/users').UsersDAO,
    SessionsDAO = require('../db/sessions').SessionsDAO;

module.exports = SessionHandler;


function SessionHandler (db) {
  'use strict';

  var users = new UsersDAO(db),
      sessions = new SessionsDAO(db);



  // MIDDLEWARE
  this.isLoggedInMiddleware = function(req, res, next) {
    var sessionId = req.cookies.session;
    console.log('session: ' + sessionId);

    sessions.getUserEmail(sessionId, function(err, email) {
      if (!err && email) {
        req.email = email;
      }
      return next();
    });
  };



  // GET
  this.handleLogout = function(req, res, next) {
    var sessionId = req.cookies.session;
    
    sessions.endSession(sessionId, function (err) {
      res.cookie('session', '');
      return res.send(200);
    });
  };
  
  this.isAuthenticated = function(req, res, next) {
    if (req.email) {
      res.send(200);
    } else {
      res.send(401);
    }
  };

  this.displayPasswordReset = function(req, res, next) {
    res.render('reset_password', {error: ''});
  };



  // POST
  this.handleLoginRequest = function(req, res, next) {

    var email = req.body.email,
        password = req.body.password;

    console.log('user submitted email: ' + email + ' pass: ' + password);

    users.validateLogin(email, password, function(err, user) {

      if (err) {
        if (err.noSuchUser) {
          return res.json({error: {noSuchUser: true}});
        }
        else if (err.invalidPassword) {
          return res.json({error: {invalidPassword: true}});
        }
        else {
          // Some other kind of error
          return next(err);
        }
      }

      sessions.startSession(user.email, function(err, sessionId) {
        if (err) { return next(err); }

        res.cookie('session', sessionId);
        return res.json({});
      });
    });
  };


  this.handleSignup = function(req, res, next) {
    var email = req.body.email,
        password = req.body.password,
        name = req.body.name,
        errors = {};

    if (validateSignup(name, email, password, errors)) {
      users.createNewUser(name, email, password, function(err, user) {

        if (err) {
          // this was a duplicate
          if (err.code === '11000') {
            errors.error = 'Email already in use. Please choose another';
            return res.json(errors);
          }
          // this was a different error
          else {
            return next(err);
          }
        }

        sessions.startSession(user.email, function(err, sessionId) {
          if (err) { return next(err); }

          res.cookie('session', sessionId);
          return res.json({user: user});
        });
      });
    } else {
      console.log('user did not validate');
      return res.json(errors);
    }
  };


  this.handlePasswordReset = function(req, res, next) {
    res.render('reset_password', {error: 'sorry this is still under construction, plz email: team@trybes.org'});
  };



  // HELPERS
  function validateSignup(name, email, password, errors) {
    var PASS_RE = /^.{3,20}$/,
        EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;

    errors.error = '';

    //if (!PASS_RE.test(password)) {
    //  errors.passwordError = 'invalid password.';
    //  return false;
    //}
    if (!EMAIL_RE.test(email)) {
      errors.error = 'invalid email address';
      return false;
    }
    return true;
  }
}
