
module.exports = exports = function(app, db) {
  'use strict';


  // routes
  app.get('/', index);
  app.post('/', addEmail);

  app.get('/about', about);
  app.post('/about', addEmail);


  // request handlers
  function index(req, res){
    res.render('index', { title: 'TRYBES' });
  }

  function about(req, res){
    res.render('about', { title: 'TRYBES - About' });
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
