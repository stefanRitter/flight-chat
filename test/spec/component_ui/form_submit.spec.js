'use strict';

describeComponent('component_ui/form_submit', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should do something');

});

/*
this.on('click touch', { buttonSelector: this.submit });
this.on('uiFormProcessed', this.reactivateForm);
this.on('uiFormError', this.processFormErrors);
this.on('uiFormReset', this.processFormReset);
*/
