
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
      var _this = this;
      console.log(data);
      //$.ajax(__DOMAIN + '/app/login', {
      //  method: 'POST'
      //});

      /* three options:
        1 - login successful    => redirect to appPage
        2 - password wrong      => show error message to try again
        3 - user doesn't exist  => redirect to SignUp
      */
      setTimeout( function() {
        _this.trigger(_this.select('submitButtons'), 'uiFormProcessed', {});
      }, 2000);
    };

    // initialize
    this.after('initialize', function () {
      this.on('dataUserLogin', this.authenticateUser);
      this.isAuthenticatedUser();
    });
  }
});
