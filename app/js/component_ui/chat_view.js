
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      withFormDataSerialize = require('mixin/with_form_data_serialize'),
      templates = require('js/templates');

  return defineComponent(chatView, withFormDataSerialize);

  function chatView() {
    this.$chatMessages = [];


    this.sendMessage = function (e, message) {
      this.pushMessage(message, 'self', true);
      this.scroll();
      this.trigger('uiFormProcessed');
    };


    this.receiveMessage = function (e, message) {
      this.pushMessage(message, '', false);
      this.scroll();
      this.trigger('uiConversationSeen', {conversationId: message.conversationId});
    };


    this.confirmSend = function (e, message) {
      this.$chatMessages.find('#' + message._id).find('.chat-message-not-sent').remove();
    };


    this.loadConversation = function (e, conversation) {
      var _this = this,
          self = '',
          userId = window.__APP.__USER._id,
          message = {};

      for (message in conversation) {
        if (conversation.hasOwnProperty(message)) {
          message = conversation[message];
          if (message.user._id === userId) {
            self = 'self';
          } else {
            self = '';
          }
          _this.pushMessage(message, self, false);
        }
      }

      this.scroll();
    };


    this.destroyView = function() {
      setTimeout(function() {
        $('#app-view').css({display: 'none'});
      }, 350);
      this.teardown();
    };


    // initialize
    this.after('initialize', function () {
      var conversationId = this.attr.conversationId,
          template = templates['templates/chat_view.html'].render({conversationId: conversationId});

      this.$node.html(template).css('display', 'block');
      this.$chatMessages = $('#chatMessages');

      var _this = this;
      setTimeout(function() {
        _this.$node.addClass('show');
      }, 100);

      this.on(document, 'dataConversation', this.loadConversation);
      this.on(document, 'dataEmitMessage', this.sendMessage);
      this.on(document, 'dataMessageSent', this.confirmSend);
      this.on(document, 'dataMessageReceived', this.receiveMessage);
      this.on('uiDestroyView', this.destroyView);

      this.trigger('uiNeedsConversation', {conversationId: conversationId});
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

      this.$chatMessages.append(template);
    };

    this.scroll = function () {
      this.$chatMessages.animate({ scrollTop: this.$chatMessages[0].scrollHeight}, 300);
    };
  }
});
