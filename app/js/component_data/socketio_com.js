
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
      this.socket.emit('message', serialize(data.formData));
    };

    this.receiveMessage = function (message, _this) {
      console.log(message);
      _this.trigger(_this.select('submitButtons'), 'uiFormReset');
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

      this.on('dataSendMessage', this.emit);
    });


    // helpers
    function serialize(formData) {
      var data = {};
      for(var i = 0, len = formData.length; i < len; ++i) {
        data[formData[i].name] = formData[i].value;
      }
      return data;
    }
  }
});
