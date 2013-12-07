
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      withFormDataSerialize = require('mixin/with_form_data_serialize'),
      templates = require('js/templates');

  return defineComponent(viewLink, withFormDataSerialize);

  function viewLink() {
    this.$chatMessages = [];


    this.sendMessage = function (e, message) {
      this.pushMessage(message, 'self', true);
      this.trigger('uiFormProcessed');
    };


    this.receiveMessage = function (e, message) {
      this.pushMessage(message, '', false);
      this.trigger('uiConversationSeen', {conversationId: message.conversationId});
    };


    this.confirmSend = function (e, message) {
      this.$chatMessages.find('#' + message._id).find('.chat-message-not-sent').remove();
    };


    // initialize
    this.after('initialize', function () {
      var conversationId = this.attr.conversationId,
          template = templates['templates/chat_view.html'].render({conversationId: conversationId});

      this.$node.html(template).addClass('show');
      this.$chatMessages = $('#chatMessages');

      this.on(document, 'dataEmitMessage', this.sendMessage);
      this.on(document, 'dataMessageSent', this.confirmSend);
      this.on(document, 'dataMessageReceived', this.receiveMessage);
      this.on('uiDestroyView', this.teardown);

      this.trigger('uiConversationSeen', {conversationId: conversationId});
    });


    // helpers
    this.pushMessage = function (message, self, notSent) {
      var template = templates['templates/chat_message.html'].render({
        _id: message._id,
        imageUrl: message.user.imageUrl,
        text: message.text,
        conversationId: message.conversationId,
        self: self,
        notSent: notSent
      });

      this.$chatMessages
        .append(template)
        .animate({ scrollTop: this.$chatMessages[0].scrollHeight}, 300);
    };
  }
});
