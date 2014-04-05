'use strict';

describeComponent('component_ui/switch_page', function () {
  it('should load the next page on uiSwitchPage', function() {
    setupComponent();
    
    spyOn(this.component.attr, 'signinPage');
    this.component.trigger('uiSwitchPage', {name: 'signinPage'});
    expect(this.component.attr.signinPage).toHaveBeenCalled();
  });
});
