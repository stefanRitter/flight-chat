
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
    this.event = '';

    this.submit = function(e) {
      e.preventDefault();
      this.off('click touch', this.submit);
      this.on('click touch', this.doNothing);
      
      this.buttonText = this.$node.text();
      this.$node.html(loader);
      this.siblings.css('opacity', 0.6);
      
      var data = this.$form.serializeArray();
      this.trigger(this.event, {formData: data});
    };

    this.doNothing = function(e) {
      e.preventDefault();
    };

    // initialize
    this.after('initialize', function () {
      this.siblings = this.$node.siblings('input');
      this.$form = this.$node.closest('form');
      this.event = this.$form.data('event');

      this.on('click touch', this.submit);

      this.on('uiFormProcessed', function() {
        this.siblings.css('opacity', 1);
        this.$node.html(this.buttonText);
        this.off('click touch', this.doNothing);
        this.on('click touch', this.submit);
      });
    });
  }
});
