
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

    this.signupUser = function(e, data) {
      var _this = this,
          formData = data.formData,
          name = formData[0].value,
          email = formData[1].value,
          password = formData[2].value;

      if (name === '') {
        return this.trigger(this.select('submitButtons'), 'uiFormError', {error: 'please pick a user name'});
      }
      if (!validateEmail(email)) {
        return this.trigger(this.select('submitButtons'), 'uiFormError', {error: 'invalid email'});
      }
      if (password === '') {
        return this.trigger(this.select('submitButtons'), 'uiFormError', {error: 'missing password'});
      }


      $.ajax(__DOMAIN + '/app/signup_one', {
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
        }
        _this.triggerSwitch();

      }).fail(function(err){
        _this.trigger(_this.select('submitButtons'), 'uiFormError', {error: 'unknown error, plz contact: team@trybes.org'});
      });
    };


    // initialize
    this.after('initialize', function () {
      this.on('dataSignup1', this.signupUser);
    });


    // helpers
    function validateEmail(email) {
      return email.match(/^[\S]+@[\S]+\.[\S]+$/);
    }
  }
});
