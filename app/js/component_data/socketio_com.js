
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(socketioCom);

  function socketioCom() {

    this.socket = {};

    this.emit = function(e, data) {
      this.socket.emit('message', data);
    };

    this.receiveMessage = function (message, _this) {
      _this.trigger('dataMessageIncoming', message);
    };

    // initialize
    this.after('initialize', function () {

      this.on('dataSocketInit', function() {
        this.socket = window.io.connect();

        var _this = this;
        this.socket.on('message', function(message) {
          _this.receiveMessage(message, _this);
        });
      });

      this.on('dataEmitMessage', this.emit);

      // start connection
      this.trigger('dataSocketInit');
    });
  }
});
