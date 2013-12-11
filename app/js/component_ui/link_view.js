
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      viewChat = require('component_ui/view_chat');

  return defineComponent(viewLink);

  function viewLink() {

    this.defaultAttrs({
      linkSelector: '.js-view-link',
      appView: '#app-view'
    });

    this.load = {
      chatView: function($link) {
        viewChat.attachTo('#app-view', {
          conversationId: $link.attr('id')
        });
      },
      imageUploaderView: function($link) {
        console.error('imageUploaderView not implemted yet');
      },
      back: function($link, self) {
        self.trigger(self.select('appView'), 'uiDestroyView', {});
        $('#app-view').removeClass('show');
      }
    };

    this.handleClick = function(e) {
      e.preventDefault();
      var $link = $(e.target).closest('.js-view-link');
      this.load[$link.attr('href')]($link, this);
    };

    // initialize
    this.after('initialize', function () {
      this.on('click touch', {
        linkSelector: this.handleClick
      });
    });
  }
});
