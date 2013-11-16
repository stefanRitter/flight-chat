
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(switchSection);

  function switchSection () {
    // attributes
    this.$self = null;
    this.$nav = null;
    
    // initialize
    this.after('initialize', function () {
      this.$self = $(this.$node.data('id'));
      this.$nav = $('header.main-header li');

      this.on('click touch', function(e) {
        $('section').addClass('out');
        this.$self.removeClass('out');
        this.$nav.removeClass('active');
        this.$node.addClass('active');
      });
    });
  }
});
