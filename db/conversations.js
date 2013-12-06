
module.exports.ConversationsDAO = ConversationsDAO;

function ConversationsDAO(db) {
  'use strict';

  /* If this constructor is called without the "new" operator, "this" points
   * to the global object. Log a warning and call it correctly. */
  if (false === (this instanceof ConversationsDAO)) {
    console.log('Warning: ConversationsDAO constructor called without "new" operator');
    return new ConversationsDAO(db);
  }

  var conversations = db.collection('conversations');

  this.put = function(message, socket, callback) {
    var conversation = { _id: '0'};

    return callback(message, conversation, socket);
  };

  this.removeSocket = function(socket) {
  };
}
