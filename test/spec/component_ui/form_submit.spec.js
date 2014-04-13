'use strict';

describeComponent('component_ui/form_submit', function () {

  beforeEach(function () {
    setupComponent(readFixtures('form.html'));
  });

  it('should trigger the event specified in the data-event attribute on submit', function () {
    spyOnEvent(document, 'uiCustomFormSubmitEvent');
    $('button[type=submit]').trigger('click');
    expect('uiCustomFormSubmitEvent').toHaveBeenTriggeredOn(document);
  });

  it('should insert errors on uiFormError', function() {
    $('button[type=submit]').trigger('click');
    this.component.trigger('uiFormError', {error: 'error text'});
    expect($('.error')).toHaveText('error text');
  });

  it('should show form is being processed on submit', function() {
    $('button[type=submit]').trigger('click');
    expect($('button[type=submit]'))
      .toHaveHtml('<img class="animRotateRound" src="img/spinner-white.png">');
  });

  it('should show form is available again on uiFormProcessed', function() {
    var originalButtonHtml = $('button[type=submit]').html();
    $('button[type=submit]').trigger('click');
    this.component.trigger('uiFormProcessed');
    expect($('button[type=submit]')).toHaveHtml(originalButtonHtml);
  });

  it('should reset the form on uiFormReset', function() {
    $('button[type=submit]').trigger('click');
    
    $('input[type="text"]').val('test value');
    this.component.trigger('uiFormReset');
    expect($('input[type="text"]')).toHaveValue('');
  });
});
