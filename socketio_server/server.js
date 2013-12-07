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
        // get conversation from DB and handle it
        var conversation = conversations.put(message, socket, handleMessage);
      }
    });

    var _socket = socket;
    setInterval(function() {
      _socket.emit('message', {
        conversationId: '5000',
        text: 'It is now: ' + Date.now(),
        userId: 'img/user2.jpg',
        _id: Date.now()
      });
    },3000);

    socket.on('disconnect', function() {
      console.log('SOCKET.IO disconnected: ' + socket.id);
      
      var connectedConversations = socket.connectedConversations;
      for (var i = 0, len = connectedConversations.length; i < len; ++i) {
        socket.leave(connectedConversations[i]);
      }
    });
  });
}

function handleMessage(message, conversation, socket) {
  'use strict';

  if (conversation !== null) {
    if (socket.connectedConversations.indexOf(conversation._id) === -1) {
      socket.connectedConversations.push(conversation._id);
      socket.join(conversation._id);
    }
    
    var res = {
      conversationId: conversation._id,
      text: message.text,
      userId: message.userId,
      _id: message._id
    };
    socket.broadcast.to(conversation._id).emit('message', res);
    socket.emit('message', res);
  }
}

function verifyMessage(message) {
  'use strict';
  return true;
}

