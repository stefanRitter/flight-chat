
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      __DOMAIN = require('component_data/domain');

  return defineComponent(authenicate);

  function authenicate() {
    // attributes
    this.defaultAttrs({
      submitButtons: 'input[type=submit], button[type=submit]'
    });
    this.existingUser = false;
    this.newUser = false;


    this.triggerSwitch = function () {
      if (this.existingUser) {
        this.trigger('uiSwitchPage', {name: 'appPage'});
      } else if (this.newUser) {
        this.trigger('uiSwitchPage', {name: 'signupPage'});
      } else {
        this.trigger('uiSwitchPage', {name: 'signinPage'});
      }
    };


    this.isAuthenticatedUser = function (e, user) {
      var _this = this;
      $.ajax(__DOMAIN + '/app/authenticated', {
        method: 'GET',
        statusCode: {
          401: function() {
            _this.triggerSwitch();
          },
          200: function() {
            _this.existingUser = true;
            _this.triggerSwitch();
          }
        }
      });
    };


    this.authenticateUser = function(e, data) {
      var _this = this,
          formData = data.formData,
          email = formData[0].value,
          password = formData[1].value;
      
      // reset
      this.existingUser = false;
      this.newUser = false;
      
      if (!validateEmail(email)) {
        return this.trigger(this.select('submitButtons'), 'uiFormError', {error: 'invalid email'});
      }
      if (password === '') {
        return this.trigger(this.select('submitButtons'), 'uiFormError', {error: 'missing password'});
      }

      $.ajax(__DOMAIN + '/app/login', {
        method: 'POST',
        data: formData

      }).done(function(data) {
        if (data.error) {
          if (data.error.noSuchUser) {
            _this.newUser = true;
          } else if (data.error.invalidPassword) {
            return _this.trigger(_this.select('submitButtons'), 'uiFormError', {error: 'wrong password'});
          }
        } else {
          _this.existingUser = true;
        }
        _this.triggerSwitch();

      }).fail(function(err){
        _this.trigger(_this.select('submitButtons'), 'uiFormError', {error: 'unknown error, plz contact: team@trybes.org'});
      });
    };


    // initialize
    this.after('initialize', function () {
      this.on('dataUserLogin', this.authenticateUser);
      this.isAuthenticatedUser();
    });


    // helpers
    function validateEmail(email) {
      return email.match(/^[\S]+@[\S]+\.[\S]+$/);
    }
  }
});
