'use strict';

describeMixin('mixin/with_form_data_serialize', function() {

  // Initialize the component and attach it to the DOM
  beforeEach(function() {
    setupComponent();
  });

  it('should be defined', function() {
    expect(this.component).toBeDefined();
  });

  it('should map jQuery.serialize() array to an object', function() {
    var serialized = this.component.serialize([{name: 'formFieldName', value: 'value'}]);
    expect(serialized).toEqual({formFieldName: 'value'});
  });
});
