
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(switchSection);

  function switchSection () {
    // attributes
    this.flipsnap = {};
    this.self = [];
    this.$nav = [];

    // initialize
    this.after('initialize', function () {
      this.flipsnap = window.Flipsnap('.fs-flipsnap');

      this.self = this.$node.attr('id');
      this.$nav = $('header.main-header li');

      this.on('click touch', function(e) {
        this.$nav.removeClass('active');
        this.$node.addClass('active');
        this.flipsnap.moveToPoint(this.self);
      });

      this.on(document, 'resize', function () {
        this.flipsnap.refresh();
      });

      var _this = this;
      this.flipsnap.element.addEventListener('fspointmove', function() {
        _this.$nav.removeClass('active');
        $('#'+_this.flipsnap.currentPoint).addClass('active');
      }, false);
    });
  }
});
