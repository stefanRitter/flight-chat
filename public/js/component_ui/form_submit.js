
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      loader = new Image();

  loader.className = 'animRotateRound';
  loader.src = '/img/spinner-white.png';

  return defineComponent(formSubmit);

  function formSubmit() {
    // initialize
    this.after('initialize', function () {
      this.on('click touch', function(e) {
        e.preventDefault();
        this.$node.html(loader).siblings('input').css('opacity', 0.6);
      });
    });
  }
});
