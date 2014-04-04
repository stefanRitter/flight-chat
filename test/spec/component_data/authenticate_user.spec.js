'use strict';

describeComponent('component_data/authenticate_user', function () {

  describe('checks if user is authenticated on initialization', function () {
    var d = {};

    beforeEach(function() {
      jQuery.ajax = spyOn(jQuery, 'ajax').andCallFake( function() {
        d = $.Deferred();
        return d.promise();
      });
    });

    it ('should trigger uiSwitchPage on initialization', function () {
      spyOnEvent(document, 'uiSwitchPage');
      setupComponent();
      d.reject();
      expect('uiSwitchPage').toHaveBeenTriggeredOn(document);
    });

    it ('should trigger uiSwitchPage to login page when no user is authenticated', function () {
      var eventSpy = spyOnEvent(document, 'uiSwitchPage');
      setupComponent();
      d.reject();
      expect(eventSpy.mostRecentCall.data).toEqual({name: 'signinPage'});
    });

    it ('should trigger uiSwitchPage to app page when user is authenticated', function () {
      var eventSpy = spyOnEvent(document, 'uiSwitchPage');
      setupComponent();
      d.resolve({user: {}});
      expect(eventSpy.mostRecentCall.data).toEqual({name: 'appPage'});
    });
  });


  describe('authenticates user on dataUserLogin', function () {
    var d = {};

    beforeEach(function() {
      jQuery.ajax = spyOn(jQuery, 'ajax').andCallFake( function() {
        d = $.Deferred();
        return d.promise();
      });
    });
  });
});
