
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      withFormDataSerialize = require('mixin/with_form_data_serialize'),
      withQuickHash = require('mixin/with_quick_hash');

  return defineComponent(conversations, withFormDataSerialize, withQuickHash);

  function conversations() {

    this.activeConversations = {};


    this.emitMessage = function (e, data) {
      var message = this.serialize(data.formData);
      message.user = window.__APP.__USER;
      message._id = this.quickHash(Date.now() + '_' + message.user._id);

      this.handleConversation(message);
      this.activeConversations[message.conversationId][message._id] = message;
      this.trigger('dataEmitMessage', message);
    };


    this.reEmitMessage = function (e, data) {
      var message = this.serialize(data.formData);
      message = this.activeConversations[message.conversationId][message._id];
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
      this.on('uiReEmitMessage', this.reEmitMessage);
      this.on('dataMessageIncoming', this.addMessage);
    });


    // helpers
    this.handleConversation = function (message) {
      if (!this.activeConversations[message.conversationId]) {
        this.activeConversations[message.conversationId] = {};
        this.trigger('dataNewConversation', message);
      }
    };
  }
});
