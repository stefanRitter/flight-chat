
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      withFormDataSerialize = require('mixin/with_form_data_serialize'),
      withQuickHash = require('mixin/with_quick_hash');

  return defineComponent(conversations, withFormDataSerialize, withQuickHash);

  function conversations() {

    this.activeConvs = {};


    this.emitMessage = function (e, data) {
      var message = this.serialize(data.formData);
      message.user = window.__APP.__USER;
      message._id = this.quickHash(Date.now() + '_' + message.user._id);

      this.handleConversation(message);
      this.activeConvs[message.conversationId][message._id] = message;
      this.trigger('dataEmitMessage', message);
    };


    this.reEmitMessage = function (e, data) {
      var message = this.serialize(data.formData);
      message = this.activeConvs[message.conversationId][message._id];
      this.trigger('dataEmitMessage', message);
    };


    this.addMessage = function (e, message) {
      this.handleConversation(message);
      if (this.activeConvs[message.conversationId][message._id]) {
        this.trigger('dataMessageSent', message);
      } else {
        this.activeConvs[message.conversationId][message._id] = message;
        this.trigger('dataMessageReceived', message);
      }
    };


    this.getConversation = function (e, data) {
      if (this.activeConvs[data.conversationId]) {
        this.trigger('dataConversation', this.activeConvs[data.conversationId]);
      } else {
        // do an ajax call
      }
    };


    // initialize
    this.after('initialize', function () {
      this.on('uiEmitMessage', this.emitMessage);
      this.on('uiReEmitMessage', this.reEmitMessage);
      this.on('dataMessageIncoming', this.addMessage);
      this.on('uiNeedsConversation', this.getConversation);
    });


    // helpers
    this.handleConversation = function (message) {
      if (!this.activeConvs[message.conversationId]) {
        this.activeConvs[message.conversationId] = {};
        this.trigger('dataNewConversation', message);
      }
    };
  }
});
