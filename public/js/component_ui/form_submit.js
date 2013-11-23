
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      loader = new Image();

  loader.className = 'animRotateRound';
  loader.src = '/img/spinner-white.png';

  return defineComponent(formSubmit);

  function formSubmit() {
    this.siblings = [];
    this.$form = {};
    this.buttonText = '';

    // initialize
    this.after('initialize', function () {
      this.siblings = this.$node.siblings('input');
      this.$form = this.$node.closest('form');

      this.on('click touch', function(e) {
        e.preventDefault();
        this.buttonText = this.$node.text();
        this.$node.html(loader);
        this.siblings.css('opacity', 0.6);
        var data = this.$form.serializeArray();
        console.log(data);
      });

      this.on('uiFormProcessed', function() {
        this.siblings.css('opacity', 1);
        this.$node.html(this.buttonText);
      });
    });
  }
});
