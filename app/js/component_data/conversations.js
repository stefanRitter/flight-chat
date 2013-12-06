
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


    this.emitMessage = function (e, data) {
      var message = serialize(data.formData);
      message._id = quickHash(Date.now() + message.userId);
      
      this.handleConversation(message);
      this.activeConversations[message.conversationId][message._id] = message;
      console.log(this.activeConversations[message.conversationId][message._id]);
      this.trigger('dataEmitMessage', message);
    };


    this.addMessage = function (e, message) {
      this.handleConversation(message);
      if (this.activeConversations[message.conversationId][message._id]) {
        this.trigger('dataMessageSent', message);
      } else {
        this.activeConversations[message.conversationId][message._id] = message;
        this.trigger('dataMessageReceived', message);
      }
    };


    // initialize
    this.after('initialize', function () {
      this.on('uiEmitMessage', this.emitMessage);
      this.on('dataMessageIncoming', this.addMessage);
    });


    // helpers
    this.handleConversation = function (message) {
      if (!this.activeConversations[message.conversationId]) {
        this.activeConversations[message.conversationId] = {};
        this.trigger('dataNewConversation', message);
      }
    };

    function serialize(formData) {
      var data = {};
      for(var i = 0, len = formData.length; i < len; ++i) {
        data[formData[i].name] = formData[i].value;
      }
      return data;
    }

    function quickHash(str) {
      var hash = 0,
          l = str.length,
          i, cha;
      
      if (l === 0) { return hash; }
      for (i = 0; i < l; i+=1) {
        cha = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+cha;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }
  }
});
