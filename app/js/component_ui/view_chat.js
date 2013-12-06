
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      templates = require('js/templates');

  return defineComponent(viewLink);

  function viewLink() {
    var _this = this;

    this.defaultAttrs({
    });


    this.sendMessage = function (e, data) {
      // render message template
      console.log('messagePending: RENDER TEMPLATE', data);
    };


    this.receiveMessage = function (e, message) {
      // render message template
      console.log('messageReceived: HIDE RESEND BUTTON', message);
    };


    this.confirmSend = function (e, message) {
      // remove resend option from sent message
      console.log('messageSent: DRAW TEMPLATE', message);
    };


    // initialize
    this.after('initialize', function () {
      var userId = this.attr.userId,
          conversationId = this.attr.conversationId,
          template = templates['templates/chat_view.html'].render({userId: userId, conversationId: conversationId});

      this.$node.html(template).addClass('show');

      this.on(document, 'uiEmitMessage', this.sendMessage);
      this.on(document, 'dataMessageSent', this.confirmSend);
      this.on(document, 'dataMessageReceived', this.receiveMessage);
      this.on('uiDestroyView', this.teardown);
    });


    // helpers
    this.showMessage = function (message) {

    };
  }
});
