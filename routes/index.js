
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Trybes' });
};

exports.about = function(req, res){
  res.render('about', { title: 'Trybes - About' });
};

exports.claim = function(req, res){
  res.render('index', { title: 'Trybes - Claim Invite' });
};
