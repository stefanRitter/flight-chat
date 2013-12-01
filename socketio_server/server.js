var socketio = require('socket.io'),
    ConversationsDAO = require('../db/conversations').ConversationsDAO,
    io = {};

module.exports.listen = listen;

function listen(server, db) {
  'use strict';

  var conversations = new ConversationsDAO(db),

  io = socketio.listen(server);
  io.set('log level', 1);

  io.sockets.on('connection', function(socket) {
    console.log('SOCKET.IO connected: ' + socket.id);

    socket.connectedConversations = [];

    socket.on('message', function(message){
      if (verifyMessage(message)) {
        
        // get conversation from DB or create a new one and verfiy if this is a correct request
        var conversation = conversations.put(message, socket),
            res = {};
        
        if (conversation !== null) {
          
          if (socket.connectedConversations.indexOf(conversation.id) === -1) {
            socket.connectedConversations.push(conversation.id);
            socket.join(conversation.id);
          }
          
          res = {
            conversationId: conversation.id,
            text: message.text,
            user: message.userId,
            isNew: conversation.isNew
          };
          socket.broadcast.to(conversation.id).emit('message', res);
          socket.emit('message', res);
        }
      }
    });

    socket.on('disconnect', function() {
      console.log('SOCKET.IO disconnected: ' + socket.id);
      
      var connectedConversations = socket.connectedConversations;
      for (var i = 0, len = connectedConversations.length; i < len; ++i) {
        socket.leave(connectedConversations[i]);
      }
    });
  });
}

function verifyMessage(message) {
  'use strict';
  return true;
}

