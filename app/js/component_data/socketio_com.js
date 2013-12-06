
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      __DOMAIN = require('component_data/domain');

  return defineComponent(socketioCom);

  function socketioCom() {
    // attributes
    this.defaultAttrs({
      submitButtons: 'input[type=submit], button[type=submit]'
    });
    this.socket = {};


    this.emit = function(e, data) {
      this.socket.emit('message', data);
    };


    this.receiveMessage = function (message, _this) {
      _this.trigger('dataMessageReceived', message);
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
    });
  }
});
