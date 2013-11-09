
/*
 * GET home page.
 */

exports.index = function(req, res){
  'use strict';
  res.render('index', { title: 'Trybes' });
};

exports.about = function(req, res){
  'use strict';
  res.render('about', { title: 'Trybes - About' });
};


function validateEmail(email) {
  'use strict';
  return email.match(/^[\S]+@[\S]+\.[\S]+$/);
}
