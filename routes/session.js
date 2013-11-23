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
    sessions.getUserEmail(sessionId, function(err, email) {
      if (!err && email) {
        req.email = email;
      }
      return next();
    });
  };



  // GET
  this.displayLoginPage = function(req, res, next) {
    return res.render('login', {email:'', password:'', loginError:''});
  };
  this.displaySignupPage =  function(req, res, next) {
    res.render('signup', {  email:'', password:'',
                            passwordError:'', emailError:'',
                            verifyError:''});
  };

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


  // POST
  this.handleLoginRequest = function(req, res, next) {

    var email = req.body.email,
        password = req.body.password;

    console.log('user submitted email: ' + email + ' pass: ' + password);

    users.validateLogin(email, password, function(err, user) {

      if (err) {
        if (err.noSuchUser) {
          return res.render('login', {email: email, password:'', loginError:'No such user'});
        }
        else if (err.invalidPassword) {
          return res.render('login', {email: email, password:'', loginError:'Invalid password'});
        }
        else {
          // Some other kind of error
          return next(err);
        }
      }

      sessions.startSession(user.email, function(err, sessionId) {
        if (err) { return next(err); }

        res.cookie('session', sessionId);
        return res.redirect('/welcome');
      });
    });
  };

  this.handleSignup = function(req, res, next) {

    var email = req.body.email,
        password = req.body.password,
        verify = req.body.verify,
        errors = {'email': email};

    if (validateSignup(email, password, verify, errors)) {
      users.createNewUser(email, password, function(err, user) {

        if (err) {
          // this was a duplicate
          if (err.code === '11000') {
            errors.emailError = 'Email already in use. Please choose another';
            return res.render('signup', errors);
          }
          // this was a different error
          else {
            return next(err);
          }
        }

        sessions.startSession(user.email, function(err, sessionId) {
          if (err) { return next(err); }

          res.cookie('session', sessionId);
          return res.redirect('/app');
        });
      });
    }
    else {
      console.log('user did not validate');
      return res.render('signup', errors);
    }
  };


  // HELPERS
  function validateSignup(email, password, verify, errors) {
    var PASS_RE = /^.{3,20}$/,
        EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;

    errors.passwordError = '';
    errors.verifyError = '';
    errors.emailError = '';

    if (!PASS_RE.test(password)) {
      errors.passwordError = 'invalid password.';
      return false;
    }
    if (password !== verify) {
      errors.verifyError = "passwords don't match";
      return false;
    }
    if (!EMAIL_RE.test(email)) {
      errors.emailError = 'invalid email address';
      return false;
    }
    return true;
  }
}
