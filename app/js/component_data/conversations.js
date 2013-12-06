
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      __DOMAIN = require('component_data/domain');

  return defineComponent(conversations);

  function conversations() {
    // attributes
    this.defaultAttrs({
      
    });
    this.activeConversations = {};


    this.pushMessage = function (e, data) {
      var message = serialize(data.formData);
      this.handleMessage(message);
      this.trigger('dataEmitMessage', message);
    };


    this.addMessage = function (e, message) {
      this.handleMessage(message);
      console.log(message);
    };


    this.handleMessage = function (message) {
      if (this.activeConversations[message.conversationId]) {
        this.activeConversations[message.conversationId].unshift(message);
      } else {
        this.activeConversations[message.conversationId] = [];
        this.activeConversations[message.conversationId].unshift(message);
        this.trigger('uiNewConversation', message);
      }
    };


    // initialize
    this.after('initialize', function () {
      this.on('dataAddMessage', this.pushMessage);
      this.on('dataMessageReceived', this.addMessage);
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
