var crypto = require('crypto');

module.exports.SessionsDAO = SessionsDAO;

function SessionsDAO(db) {
  'use strict';

  /* If this constructor is called without the "new" operator, "this" points
   * to the global object. Log a warning and call it correctly. */
  if (false === (this instanceof SessionsDAO)) {
    console.log('Warning: SessionsDAO constructor called without "new" operator');
    return new SessionsDAO(db);
  }

  var sessions = db.collection('sessions');


  this.startSession = function(email, callback) {

    // Generate session id
    var currentDate = (new Date()).valueOf().toString(),
        random = Math.random().toString(),
        sessionId = crypto.createHash('sha1').update(currentDate + random).digest('hex'),

        session = {'email': email, '_id': sessionId};

    // Insert session document
    sessions.insert(session, function (err, result) {
      callback(err, sessionId);
    });
  };


  this.endSession = function(sessionId, callback) {
    // Remove session document
    sessions.remove({ '_id' : sessionId }, function (err, numRemoved) {
      callback(err);
    });
  };


  this.getUserEmail = function(sessionId, callback) {

    if (!sessionId) {
      callback(new Error('Session not set'), null);
      return;
    }

    sessions.findOne({ '_id' : sessionId }, function(err, session) {
      if (err) { return callback(err, null); }

      if (!session) {
        callback(new Error('Session: ' + session + ' does not exist'), null);
        return;
      }

      callback(null, session.email);
    });
  };
}
