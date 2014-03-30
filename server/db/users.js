var bcrypt = require('bcrypt-nodejs');

module.exports.Users = function(db) {
  'use strict';

  var users = db.collection('users');

  this.createNewUser = function(name, email, password, callback) {

    // Generate password hash
    var salt = bcrypt.genSaltSync(),
        passwordHash = bcrypt.hashSync(password, salt),
        user;

    // Create user document
    user =
      {
        'name': name,
        'email': email,
        'password': passwordHash,
        verified: false,
        lastLogin: Date.now(),
        imageUrl: 'img/user.jpg'
      };

    // persist
    users.insert(user, function (err, result) {
      if (err) { return callback(err, null); }
      
      console.log('Inserted new user');
      return callback(null, result[0]);
    });
  };


  this.validateLogin = function(email, password, callback) {
    
    users.findOne({ 'email' : email }, validateUserDoc);

    function validateUserDoc(err, user) {
      if (err) { return callback(err, null); }

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          // TODO: set last login previousLogin = lastLogin, lastLogin: Date.now(), increment logins
          callback(null, user);
        }
        else {
          var invalidPasswordError = new Error('Invalid password');
          // Set an extra field so we can distinguish this from a db error
          invalidPasswordError.invalidPassword = true;
          callback(invalidPasswordError, null);
        }
      }
      else {
        var noSuchUserError = new Error('User: ' + user + ' does not exist');
        // Set an extra field so we can distinguish this from a db error
        noSuchUserError.noSuchUser = true;
        callback(noSuchUserError, null);
      }
    }
  };
};
