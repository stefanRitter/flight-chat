module.exports.Users = function(db) {
  'use strict';

  var users = db.collection('users');

  this.createNewUser = function(name, callback) {
    // Create user document
    var user = {
        'name': name,
        imageUrl: 'img/user.jpg'
      };

    // persist
    users.insert(user, function (err, result) {
      if (err) { return callback(err, null); }
      
      console.log('Created new user: ' + result[0].name);
      return callback(null, result[0]);
    });
  };


  this.validateLogin = function(name, callback) {
    var that = this;
    users.findOne({name: name }, function(err, user) {
      if (err) { return callback(err, null); }

      if (user) { callback(null, user); }
      else { that.createNewUser(name, callback); }
    });
  };
};
