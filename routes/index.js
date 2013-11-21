var SessionHandler = require('./session');

module.exports = exports = function(app, db) {
  'use strict';

  var sessionHandler = new SessionHandler(db);

  // Middleware to check if a user is logged in
  app.use(sessionHandler.isLoggedInMiddleware);


  // homepage routes
  app.get('/', index);
  app.post('/', addEmail);

  app.get('/about', about);
  app.post('/about', addEmail);


  // app namespace
  app.get('/app', loadApp);
  app.get('/app/', function(req, res) { res.redirect('/app'); });

  // Login form
  app.get('/app/login', sessionHandler.displayLoginPage);
  app.post('/app/login', sessionHandler.handleLoginRequest);

  // Logout page
  app.get('/app/logout', sessionHandler.displayLogoutPage);

  // Signup form
  app.get('/app/signup', sessionHandler.displaySignupPage);
  app.post('/app/signup', sessionHandler.handleSignup);

  // 404
  app.get('*', function(req, res) { res.sendfile('./views/404.html'); });


  // request handlers
  function index(req, res) {
    res.render('index', { title: 'TRYBES' });
  }

  function about(req, res) {
    res.render('about', { title: 'TRYBES - About' });
  }

  function loadApp(req, res) {
    res.sendfile('./views/app.html');
  }

  function addEmail(req, res) {
    var emailAddress = req.body.email,
        emails = null,
        email = null;

    if (!validateEmail(emailAddress)) {
      return res.render('index', { title: 'TRYBES',
                                   error: 'Sorry, your email address was invalid. Please correct any mistakes and try again.' });
    }

    // persist if valid
    emails = db.collection('emails');
    email = { '_id': emailAddress,
              'date': new Date(),
              'ip': req.ip};

    emails.insert(email, function(err,doc) {
      if (err) { return console.error(err); }
      console.log('inserted: ' + JSON.stringify(doc));
    });

    res.render('index', {title: 'TRYBES', success: true});
  }


  // helpers
  function validateEmail(email) {
    return email.match(/^[\S]+@[\S]+\.[\S]+$/);
  }
};
