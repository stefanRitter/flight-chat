
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      loader = new Image();

  loader.className = 'animRotateRound';
  loader.src = 'img/spinner-white.png';

  return defineComponent(formSubmit);

  function formSubmit() {
    this.$siblings = [];
    this.$form = {};
    this.$error = {};
    this.buttonHtml = '';
    this.event = '';
    this.active = false;

    this.submit = function(e) {
      e.preventDefault();
      this.off('click touch', this.submit);
      this.on('click touch', this.doNothing);
      this.active = true;

      this.$node.html(loader);
      this.$siblings.css('opacity', 0.6);
      
      var data = this.$form.serializeArray();
      this.trigger(this.event, {formData: data});
    };


    this.doNothing = function(e) {
      e.preventDefault();
    };


    this.reactivateFrom = function(e) {
      this.$siblings.css('opacity', 1);
      this.$node.html(this.buttonHtml);
      this.off('click touch', this.doNothing);
      this.on('click touch', this.submit);
    };


    this.processFormErrors = function(e, error) {
      if (this.active) {
        this.reactivateFrom(e);
        this.$error.text(error.error);
      }
    };


    this.processFormReset = function(e) {
      if (this.active) {
        this.reactivateFrom(e);
        this.$form[0].reset();
      }
    };


    // initialize
    this.after('initialize', function () {
      this.$siblings = this.$node.siblings('input');
      this.$form = this.$node.closest('form');
      this.buttonHtml = this.$node.html();
      this.$error = this.$form.find('.error');
      this.event = this.$form.data('event');

      this.on('click touch', this.submit);
      this.on('uiFormProcessed', this.reactivateFrom);
      this.on('uiFormError', this.processFormErrors);
      this.on('uiFormReset', this.processFormReset);
    });
  }
});
