
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      loader = new Image();

  loader.className = 'animRotateRound';
  loader.src = 'img/spinner-white.png';

  return defineComponent(formSubmit);

  function formSubmit() {

    this.$button = [];
    this.$siblings = [];
    this.$form = [];
    this.$error = [];
    this.buttonHtml = '';
    this.eventName = '';
    this.active = false;

    this.defaultAttrs({
      buttonSelector: 'button[type=submit]'
    });


    this.submit = function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (!this.active) {
        console.log('submit');
        this.$button = $(e.target).closest('button[type=submit]');
        this.$siblings = this.$button.siblings('input');
        this.$form = this.$button.closest('form');
        this.buttonHtml = this.$button.html();
        this.$error = this.$form.find('.error');
        this.eventName = this.$form.data('event');
        this.active = true;

        this.$button.html(loader);
        this.$siblings.css('opacity', 0.6);
        
        var data = this.$form.serializeArray();
        this.trigger(this.eventName, {formData: data});
      }
    };


    this.reactivateForm = function(e) {
      this.active = false;
      this.$siblings.css('opacity', 1);
      this.$button.html(this.buttonHtml);
    };


    this.processFormErrors = function(e, error) {
      this.reactivateForm(e);
      this.$error.text(error.error);
    };


    this.processFormReset = function(e) {
      this.reactivateForm(e);
      this.$form[0].reset();
    };


    // initialize
    this.after('initialize', function () {
      this.on('click touch', { buttonSelector: this.submit });
      this.on('uiFormProcessed', this.reactivateForm);
      this.on('uiFormError', this.processFormErrors);
      this.on('uiFormReset', this.processFormReset);
    });
  }
});
