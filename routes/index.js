
/*
 * GET home page.
 */

exports.index = function(req, res){
  'use strict';
  res.render('index', { title: 'TRYBES' });
};

exports.about = function(req, res){
  'use strict';
  res.render('about', { title: 'TRYBES - About' });
};


function validateEmail(email) {
  'use strict';
  return email.match(/^[\S]+@[\S]+\.[\S]+$/);
}
