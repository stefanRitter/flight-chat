var bcrypt = require('bcrypt-nodejs');

module.exports.UsersDAO = UsersDAO;

function UsersDAO(db) {
  'use strict';

  /* If this constructor is called without the "new" operator, "this" points
   * to the global object. Log a warning and call it correctly. */
  if (false === (this instanceof UsersDAO)) {
    console.error('Warning: UsersDAO constructor called without "new" operator');
    return new UsersDAO(db);
  }

  var users = db.collection('users');

  this.createNewUser = function(name, email, password, callback) {

    // Generate password hash
    var salt = bcrypt.genSaltSync(),
        passwordHash = bcrypt.hashSync(password, salt),
        user;

    // Create user document
    user = {'name': name, 'email': email, 'password': passwordHash, verified: false};

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
}
