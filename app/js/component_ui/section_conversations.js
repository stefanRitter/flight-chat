
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      templates = require('js/templates');

  return defineComponent(sectionConversations);

  function sectionConversations() {
    this.$chats = [];

    this.addConversation = function (e, data) {
      console.log('add addConversation: ', data);
      var template = templates['templates/chat_link.html'].render({});
      this.$chats.prepend(template);
    };


    this.markConversationAsSeen = function (e, data) {
      this.$node.find('#' + data.conversationId).removeClass('active');
    };


    this.markConversationAsActive = function (e, data) {
      var conv = this.$node.find('#' + data.conversationId).addClass('active');
      this.$chats.prepend(conv);
    };


    // initialize
    this.after('initialize', function () {
      this.$chats = this.$node.find('#chats');

      this.on(document, 'dataMessageReceived', this.markConversationAsActive);
      this.on(document, 'uiConversationSeen', this.markConversationAsSeen);
      this.on(document, 'dataNewConversation', this.addConversation);
    });
  }
});
