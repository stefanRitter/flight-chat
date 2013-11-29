
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(toggleChat);

  function toggleChat() {

    // initialize
    this.after('initialize', function () {
      this.on('click touch', function(e) {
        e.preventDefault();
        this.$node.find('.chat-conversation-body').toggleClass('show');
      });
    });
  }
});
