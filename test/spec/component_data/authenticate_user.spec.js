'use strict';

describeComponent('component_data/authenticate_user', function () {

  describe('checks if user is authenticated', function () {
    var d = {};
    window.__APP = {}; // TODO: remove global

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
});
