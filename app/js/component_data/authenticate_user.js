
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(authenticate);

  function authenticate() {
    // attributes
    this.defaultAttrs({
      submitButtons: 'input[type=submit], button[type=submit]'
    });
    this.existingUser = false;

    this.triggerSwitch = function () {
      if (this.existingUser) {
        this.trigger('uiSwitchPage', {name: 'appPage'});
      } else {
        this.trigger('uiSwitchPage', {name: 'signinPage'});
      }
    };

    this.isAuthenticatedUser = function (e, user) {
      var _this = this;
      
      $.ajax('/app/authenticated', {
        method: 'GET'
      })
        .fail(function() {
          _this.triggerSwitch();
        })
        .done(function(data) {
          if (data.user) {
            _this.existingUser = true;
            window.__APP.__USER = data.user;
          }
          _this.triggerSwitch();
        });
    };

    this.authenticateUser = function(e, data) {
      var _this = this,
          formData = data.formData,
          name = formData[0].value;

      this.existingUser = false;
      
      if (!name) {
        return this.trigger(this.select('submitButtons'), 'uiFormError', {error: 'invalid name'});
      }

      $.ajax('/app/login', {
        method: 'POST',
        data: formData

      }).done(function(data) {
        if (data.error) {
          _this.trigger(_this.select('submitButtons'), 'uiFormError', {error: 'unknown error'});
        } else {
          _this.existingUser = true;
          window.__APP.__USER = data.user;
        }
        _this.triggerSwitch();
        _this.trigger('uiFormProcessed');

      }).fail(function(err){
        _this.trigger(_this.select('submitButtons'), 'uiFormError', {error: 'unknown error'});
      });
    };

    // initialize
    this.after('initialize', function () {
      this.on('dataUserLogin', this.authenticateUser);
      this.isAuthenticatedUser();
    });
  }
});
