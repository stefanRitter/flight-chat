
module.exports.Conversations = function(db) {
  'use strict';
  var conversations = db.collection('conversations');

  this.put = function(message, socket, callback) {
    var conversation = { _id: '5000'};
    return callback(message, conversation, socket);
  };

  this.removeSocket = function(socket) {
  };
};
