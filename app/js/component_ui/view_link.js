
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      chatView = require('component_ui/chat_view');

  return defineComponent(viewLink);

  function viewLink() {

    this.defaultAttrs({
      linkSelector: '.js-view-link',
      appView: '#appView',

      chatView: function($link, self) {
        chatView.attachTo(self.select('appView'), {
          conversationId: $link.attr('id')
        });
      },
      
      imageUploaderView: function($link, self) {
        console.error('imageUploaderView not implemted yet');
      },
      
      back: function($link, self) {
        var $appView = self.select('appView');
        self.trigger($appView, 'uiDestroyView', {});
        $appView.removeClass('show');
      }
    });

    this.handleClick = function(e) {
      e.preventDefault();
      var $link = $(e.target).closest('.js-view-link');
      this.attr[$link.attr('href')]($link, this);
    };

    // initialize
    this.after('initialize', function () {
      this.on('click touch', {
        linkSelector: this.handleClick
      });
    });
  }
});
