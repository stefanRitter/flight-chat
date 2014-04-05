var socketio = require('socket.io'),
    Conversations = require('./db/conversations').Conversations,
    io = {};

module.exports.listen = listen;

function listen(server, db) {
  'use strict';

  var conversations = new Conversations(db),

  io = socketio.listen(server);
  io.set('log level', 1);

  io.sockets.on('connection', function(socket) {
    console.log('SOCKET.IO connected: ' + socket.id);

    socket.connectedConversations = [];

    socket.on('message', function(message){
      if (verifyMessage(message)) {
        // get conversation from DB
        var conversation = conversations.put(message, socket, handleMessage);
      }
    });

    var _socket = socket;
    setInterval(function() {
      _socket.emit('message', {
        conversationId: '5000',
        text: 'It is now: ' + (new Date()).toGMTString(),
        _id: Date.now(),
        user: {
          _id: 0,
          imageUrl: 'img/logo.png',
          name: 'Flight Chat'
        }
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
      _id: message._id,
      text: message.text,
      user: {
          _id: 0,
          imageUrl: 'img/logo.png',
          name: 'Flight Chat'
        }
      };

    socket.broadcast.to(conversation._id).emit('message', res);
    socket.emit('message', res);
  }
}

function verifyMessage(message) {
  'use strict';
  return true;
}

