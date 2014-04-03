'use strict';

describeComponent('component_data/authenticate_user', function () {

  describe('checks if user is authenticated', function () {
    
    beforeEach(function() {
      jasmine.Ajax.install();
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it ('should trigger uiSwitchPage on initialization', function () {
      spyOnEvent(document, 'uiSwitchPage');
      setupComponent();
      expect('uiSwitchPage').toHaveBeenTriggeredOn(document);
    });

  });

});
