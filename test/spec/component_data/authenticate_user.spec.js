'use strict';

describeComponent('component_data/authenticate_user', function () {

  it ('should trigger uiSwitchPage on initialization', function () {
    spyOnEvent(document, 'uiSwitchPage');
    setupComponent();
    expect('uiSwitchPage').toHaveBeenTriggeredOn(document);
  });

});
