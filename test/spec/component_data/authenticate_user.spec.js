'use strict';

describeComponent('component_data/authenticate_user', function () {

  describe('checks if user is authenticated', function () {
    var status = 200;

    beforeEach(function() {
      jQuery.ajax = spyOn(jQuery, "ajax").andCallFake(
        function(options) {
          if(status < 300) {
            options.success();
          } else {
            options.error();
          }
        }
      );
    });

    it ('should trigger uiSwitchPage on initialization', function () {
      spyOnEvent(document, 'uiSwitchPage');
      setupComponent();
      expect('uiSwitchPage').toHaveBeenTriggeredOn(document);
    });

  });

});
