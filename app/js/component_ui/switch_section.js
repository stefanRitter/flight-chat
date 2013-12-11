
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(switchSection);

  function switchSection () {
    // attributes
    this.defaultAttrs({
      buttonSelector: 'header.main-header li'
    });
    this.flipsnap = {};
    this.$nav = [];


    this.changeSection = function (e) {
      var $li = $(e.target).closest('header.main-header li'),
          section = $li.attr('id');
      this.flipsnap.moveToPoint(section);
      this.$nav.removeClass('active');
      $li.addClass('active');
    };

    // initialize
    this.after('initialize', function () {
      this.flipsnap = window.Flipsnap('.fs-flipsnap');
      this.$nav = $('header.main-header li');

      this.on('click touch', { buttonSelector: this.changeSection });

      var _this = this;
      this.on(document, 'resize', function () {
        _this.flipsnap.refresh();
      });

      this.flipsnap.element.addEventListener('fspointmove', function(e) {
        _this.$nav.removeClass('active');
        _this.$nav.filter('#'+_this.flipsnap.currentPoint).addClass('active');
      }, false);

      // start with feed view
      this.flipsnap.moveToPoint(1);
    });
  }
});
