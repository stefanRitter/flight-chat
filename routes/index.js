
module.exports = exports = function(app, db) {
  'use strict';

  app.get('/', index);
  app.get('/about', about);
  
  function index(req, res){
    res.render('index', { title: 'TRYBES' });
  }

  function about(req, res){
    res.render('about', { title: 'TRYBES - About' });
  }

  // helpers
  function validateEmail(email) {
    return email.match(/^[\S]+@[\S]+\.[\S]+$/);
  }
};
