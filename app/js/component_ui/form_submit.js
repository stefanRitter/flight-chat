
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(formSubmit);

  function formSubmit() {

    this.$button = [];
    this.$siblings = [];
    this.$form = [];
    this.$error = [];
    this.buttonHtml = '';
    this.eventName = '';
    this.active = false;
    this.loader = new Image();

    this.defaultAttrs({
      buttonSelector: 'button[type=submit]'
    });

    this.submit = function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (!this.active) {
        this.$button = $(e.target).closest('button[type=submit]');
        this.$siblings = this.$button.siblings('input');
        this.$form = this.$button.closest('form');
        this.buttonHtml = this.$button.html();
        this.$error = this.$form.find('.error');
        this.eventName = this.$form.data('event');
        this.active = true;

        this.$button.html(this.loader);
        this.$siblings.css('opacity', 0.6);
        
        var data = this.$form.serializeArray();
        this.trigger(this.eventName, {formData: data});

        if (this.$form.data('reset')) { this.$form[0].reset(); }
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
      this.loader.className = 'animRotateRound';
      this.loader.src = 'img/spinner-white.png';

      this.on('click touch', { buttonSelector: this.submit });
      this.on('uiFormProcessed', this.reactivateForm);
      this.on('uiFormError', this.processFormErrors);
      this.on('uiFormReset', this.processFormReset);
    });
  }
});
