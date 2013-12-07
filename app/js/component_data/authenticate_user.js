
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      withValidateEmail = require('mixin/with_validate_email');

  return defineComponent(authenicate, withValidateEmail);

  function authenicate() {
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
      
      $.ajax(window.__APP.__DOMAIN + '/app/authenticated', {
        method: 'GET'
      
      }).fail(function() {
          _this.triggerSwitch();
        }).done(function(data) {
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
          email = formData[0].value,
          password = formData[1].value;
      
      // reset
      this.existingUser = false;
      
      if (!this.validateEmail(email)) {
        return this.trigger(this.select('submitButtons'), 'uiFormError', {error: 'invalid email'});
      }
      if (password === '') {
        return this.trigger(this.select('submitButtons'), 'uiFormError', {error: 'missing password'});
      }

      $.ajax(window.__APP.__DOMAIN + '/app/login', {
        method: 'POST',
        data: formData

      }).done(function(data) {
        if (data.error) {
          if (data.error.noSuchUser) {
            return _this.trigger(_this.select('submitButtons'), 'uiFormError', {error: 'no such user'});
          } else if (data.error.invalidPassword) {
            $('.reset-password').show();
            return _this.trigger(_this.select('submitButtons'), 'uiFormError', {error: 'wrong password'});
          }
        } else {
          _this.existingUser = true;
          window.__APP.__USER = data.user;
        }
        _this.triggerSwitch();
        _this.trigger('uiFormProcessed');

      }).fail(function(err){
        _this.trigger(_this.select('submitButtons'), 'uiFormError', {error: 'unknown error, plz contact: team@trybes.org'});
      });
    };


    // initialize
    this.after('initialize', function () {
      this.on('dataUserLogin', this.authenticateUser);
      this.isAuthenticatedUser();
    });
  }
});
