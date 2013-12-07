
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      withFormDataSerialize = require('mixin/with_form_data_serialize'),
      templates = require('js/templates');

  return defineComponent(viewLink, withFormDataSerialize);

  function viewLink() {
    this.$chatMessages = [];

    this.sendMessage = function (e, message) {
      var template = templates['templates/chat_message.html'].render({
        _id: message._id,
        self: 'self',
        userId: message.userId,
        text: message.text,
        notSent: true
      });

      this.$chatMessages.append(template);
      this.trigger('uiFormProcessed');
    };


    this.receiveMessage = function (e, message) {
      var template = templates['templates/chat_message.html'].render({
        _id: message._id,
        self: '',
        userId: message.userId,
        text: message.text,
        notSent: false
      });

      this.$chatMessages.append(template);
      this.trigger(this.select(document), 'uiConversationSeen', {conversationId: message.conversationId});
    };


    this.confirmSend = function (e, message) {
      // remove resend option from sent message
      this.$chatMessages.find('#' + message._id).find('.chat-message-not-sent').remove();
    };


    // initialize
    this.after('initialize', function () {
      var userId = this.attr.userId,
          conversationId = this.attr.conversationId,
          template = templates['templates/chat_view.html'].render({userId: userId, conversationId: conversationId});

      this.$node.html(template).addClass('show');
      this.$chatMessages = $('#chatMessages');

      this.on(document, 'dataEmitMessage', this.sendMessage);
      this.on(document, 'dataMessageSent', this.confirmSend);
      this.on(document, 'dataMessageReceived', this.receiveMessage);
      this.on('uiDestroyView', this.teardown);

      this.trigger(this.select(document), 'uiConversationSeen', {conversationId: conversationId});
    });


    // helpers
    this.showMessage = function (message) {

    };
  }
});
