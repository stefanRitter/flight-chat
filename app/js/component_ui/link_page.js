
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(pageLink);

  function pageLink() {
    this.link = '';

    // initialize
    this.after('initialize', function () {
      this.link = this.$node.attr('href');

      this.on('click touch', function(e) {
        e.preventDefault();
        this.trigger('uiSwitchPage', {name: this.link} );
      });
    });
  }
});
