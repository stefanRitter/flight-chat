'use strict';

describeComponent('component_data/authenticate_user', function () {
  var d = {};

  describe('checks if user is authenticated on initialization', function () {
    beforeEach(function() {
      spyOn(jQuery, 'ajax').andCallFake( function() {
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
    var submitButtons = 'input[type=submit], button[type=submit]';

    beforeEach(function() {
      spyOn(jQuery, 'ajax').andCallFake(function() {
        d = $.Deferred();
        return d.promise();
      });
      setupComponent('<div><button type="submit">submit</button></div>');
    });

    it ('should trigger uiFormError on failed login', function () {
      spyOnEvent(submitButtons, 'uiFormError');
      this.component.trigger('dataUserLogin', {
        formData: [{value: 'username'}]
      });
      d.reject();
      expect('uiFormError').toHaveBeenTriggeredOn(submitButtons);
    });

    it ('should trigger uiSwitchPage and uiFormProcessed on successful login', function () {
      spyOnEvent(document, 'uiSwitchPage');
      spyOnEvent(document, 'uiFormProcessed');
      this.component.trigger('dataUserLogin', {
        formData: [{value: 'username'}]
      });
      d.resolve({user: {}});
      expect('uiFormProcessed').toHaveBeenTriggeredOn(document);
      expect('uiSwitchPage').toHaveBeenTriggeredOn(document);
    });
  });
});
