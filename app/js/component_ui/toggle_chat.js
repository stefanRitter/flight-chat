
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(toggleChat);

  function toggleChat() {
    this.$chatBody = {};
    this.bodyHeight = 0;
    this.offsetHeight = 0;

    // initialize
    this.after('initialize', function () {
      this.$chatBody = this.$node.find('.chat-conversation-body, .js-chat-toggle');
      this.height = $('#appPage').height() - 47;
      
      var _this = this;
      $(window).on('resize', function() {
        _this.height = $('#appPage').height() - 47;
        if (_this.$chatBody.hasClass('show')) {
          _this.$chatBody.css({height: _this.height});
        }
      });

      this.on('click touch', function(e) {
        if (!this.$chatBody.hasClass('show')) {
          this.$chatBody.css({height: this.height, position: 'fixed'}).addClass('show');
        } else {
          if ($(e.target).hasClass('js-chat-toggle')) {
            this.$chatBody.css({height: 37, position: 'relative'}).removeClass('show');
          }
        }
      });
    });
  }
});
