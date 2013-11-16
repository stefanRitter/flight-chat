
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(snapScroll);

  function snapScroll () {
    var timer = 0, third = 0, currentScroll = 0;

    function setup() {
      third = $('body').innerWidth() / 3;
      currentScroll = $(window).scrollLeft();
    }

    function scrollStopped() {
      timer = 0;
      console.log(currentScroll);

      if (currentScroll < third) {
        $('html, body').animate({
          scrollLeft: $('#profileView').offset().left
        }, 500);
      } else if (currentScroll < 2*third) {
        $('html, body').animate({
          scrollLeft: $('#feedView').offset().left
        }, 500);
      } else {
        $('html, body').animate({
          scrollLeft: $('#messageView').offset().left
        }, 500);
      }
    }

    // initialize
    this.after('initialize', function () {
      setup();
      $(window).on('resize', setup);

      this.on('scroll', function(e) {
        if (timer) {
          clearTimeout(timer);
        }
        currentScroll = $(window).scrollLeft();
        timer = setTimeout(scrollStopped, 200);
      });
    });
  }
});
