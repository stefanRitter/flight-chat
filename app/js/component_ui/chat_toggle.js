
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
        if (_this.$node.hasClass('show')) {
          _this.$chatBody.css({height: _this.height});
        }
      });

      this.on('click touch', function(e) {
        if (!this.$node.hasClass('show')) {
          this.$node.addClass('show').removeClass('active');
          this.$chatBody.css({height: this.height, position: 'fixed'});
        } else {
          if ($(e.target).hasClass('js-chat-toggle')) {
            this.$node.removeClass('show');
            this.$chatBody.css({height: 37, position: 'relative'});
          }
        }
      });
    });
  }
});
