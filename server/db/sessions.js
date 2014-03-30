var crypto = require('crypto');

module.exports.Sessions = function(db) {
  'use strict';

  var sessions = db.collection('sessions');

  this.startSession = function(user, callback) {
    // Generate session id
    var currentDate = (new Date()).valueOf().toString(),
        random = Math.random().toString(),
        sessionId = crypto.createHash('sha1').update(currentDate + random).digest('hex'),
        session = {'user': {_id: user._id, name: user.name, imageUrl: user.imageUrl}, '_id': sessionId};

    // Presist session
    sessions.insert(session, function(err, result) {
      callback(err, sessionId);
    });
  };

  this.endSession = function(sessionId, callback) {
    sessions.remove({ '_id' : sessionId }, function(err) {
      callback(err);
    });
  };

  this.getUser = function(sessionId, callback) {
    if (!sessionId) {
      return callback(new Error('Session not set'), null);
    }

    sessions.findOne({ '_id' : sessionId }, function(err, session) {
      if (err) { return callback(err, null); }

      if (!session) {
        return callback(new Error('Session: ' + session + ' does not exist'), null);
      }

      callback(null, session.user);
    });
  };
};
