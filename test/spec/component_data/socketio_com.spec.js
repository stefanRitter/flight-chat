'use strict';

describeComponent('component_data/socketio_com', function() {
  var fakeSocket = {
    on: function(txt, cb) {
      fakeSocket.cb = cb;
    },
    emit: function() {}
  };

  beforeEach(function() {
    window.io = { connect: function() {} };
  });

  afterEach(function() {
    delete window.io;
  });

  describe('connects to socket.io on initialization', function() {
    it('should trigger dataSocketInit on initialization', function() {
      spyOn(window.io, 'connect').andCallFake(function() {
        return fakeSocket;
      });
      spyOnEvent(document, 'dataSocketInit');
      setupComponent();
      expect('dataSocketInit').toHaveBeenTriggeredOn(document);
      expect(window.io.connect).toHaveBeenCalled();
    });
  });

  describe('emits and receives messages from socket.io ', function() {
    beforeEach(function() {
      spyOn(window.io, 'connect').andCallFake(function() {
        return fakeSocket;
      });
      setupComponent();
    });

    it('should trigger dataMessageIncoming when receiving a message', function() {
      spyOnEvent(document, 'dataMessageIncoming');
      fakeSocket.cb({});
      expect('dataMessageIncoming').toHaveBeenTriggeredOn(document);
    });

    it('should emit a message on dataEmitMessage', function() {
      spyOn(fakeSocket, 'emit');
      this.component.trigger('dataEmitMessage', { message: 'test text'});
      expect(fakeSocket.emit).toHaveBeenCalled();
    });
  });
});
