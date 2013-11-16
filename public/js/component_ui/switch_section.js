
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(switchSection);

  function switchSection () {
    // attributes
    this.$self = null;
    
    // initialize
    this.after('initialize', function () {
      this.$self = $(this.$node.data('id'));

      this.on('click touch', function(e) {
        $('section').addClass('out');
        this.$self.removeClass('out');
      });
    });
  }
});
