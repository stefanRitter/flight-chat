
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(viewLink);

  function viewLink() {
    this.defaultAttrs({
      linkSelector: '.js-view-link'
    });

    this.handleClick = function(e) {
      e.preventDefault();
      var $link = $(e.target).closest('.js-view-link'),
          href = $link.attr('href');

      if (href === 'back') {
        this.trigger(document, 'uiDestroyView', {});
      } else {
        this.trigger(document, 'uiCreateView', {
          name: href,
          id: $link.attr('id')
        });
      }
    };

    // initialize
    this.after('initialize', function () {
      this.on('click touch', {
        linkSelector: this.handleClick
      });
    });
  }
});
