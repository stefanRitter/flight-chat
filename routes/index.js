
module.exports = exports = function(app, db, sessionHandler) {
  'use strict';

  // homepage routes
  app.get('/', index);
  app.post('/', addEmail);

  app.get('/about', about);
  app.post('/about', addEmail);

  // APP NAMESPACE
  app.get('/app', loadApp);
  app.get('/app/', function(req, res) { res.redirect('/app'); });


  // AUTHENTICATION
  // login
  app.post('/app/login', sessionHandler.handleLoginRequest);
  
  // logout!
  app.get('/app/logout', sessionHandler.handleLogout);

  // signup
  app.post('/app/signup_one', sessionHandler.handleSignup);
  app.post('/app/signup_two', sessionHandler.handleSignup);

  // authenticated?
  app.get('/app/authenticated', sessionHandler.isAuthenticated);

  // password reset
  app.get('/app/reset_password', sessionHandler.displayPasswordReset);
  app.post('/app/reset_password', sessionHandler.handlePasswordReset);



  // 404
  app.get('*', function(req, res) { res.status(404).sendfile('./views/404.html'); });



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
