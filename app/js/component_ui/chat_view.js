define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      withFormDataSerialize = require('mixin/with_form_data_serialize'),
      templates = require('js/templates');

  return defineComponent(chatView, withFormDataSerialize);

  function chatView() {
    this.defaultAttrs({
      view: '#appView',
      $chatMessages: [],
    });

    this.after('initialize', function () {
      this.on('uiCreateView',         this.createView);
      this.on('dataConversation',     this.loadConversation);
      this.on('dataEmitMessage',      this.sendMessage);
      this.on('dataMessageSent',      this.confirmSend);
      this.on('dataMessageReceived',  this.receiveMessage);
      this.on('uiDestroyView',        this.destroyView);
    });
    
    this.createView = function(e, data) {
      if (data.name !== 'chatView') { return; }

      this.attr.convId = data.id;
      var template = templates['templates/chat_view.html'].render({conversationId: this.attr.convId});

      this.select('view').html(template).css('display', 'block');
      this.attr.$chatMessages = $('#chatMessages');

      var _this = this;
      setTimeout(function() {
        // give browser 100ms to update DOM before showing this views
        _this.select('view').addClass('show');
      }, 100);
      
      this.trigger(document, 'uiNeedsConversation', {conversationId: this.attr.convId});
    };

    this.sendMessage = function (e, message) {
      this.pushMessage(message, 'self', true);
      this.scroll();
      this.trigger('uiFormProcessed');
    };

    this.receiveMessage = function (e, message) {
      this.pushMessage(message, '', false);
      this.scroll();
    };

    this.confirmSend = function (e, message) {
      this.attr.$chatMessages.find('#' + message._id)
        .find('.chat-message-not-sent').remove();
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
        $('#appView').css({display: 'none'});
      }, 350);
      this.attr.$chatMessages = [];
      this.trigger(document, 'uiConversationSeen', {conversationId: this.attr.convId});
    };


    // helpers
    this.pushMessage = function (message, self, notSent) {
      if (this.attr.$chatMessages.length === 0) { return; }

      var template = templates['templates/chat_message.html'].render({
        _id: message._id,
        imageUrl: message.user.imageUrl,
        text: message.text,
        conversationId: message.conversationId,
        self: self,
        notSent: notSent
      });

      this.attr.$chatMessages.append(template);
    };

    this.scroll = function () {
      if (this.attr.$chatMessages.length === 0) { return; }

      this.attr.$chatMessages.animate({
        scrollTop: this.attr.$chatMessages[0].scrollHeight
      }, 300);
    };
  }
});
