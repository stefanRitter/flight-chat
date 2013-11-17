
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(authenicate);

  function authenicate() {
    // attributes
    this.authenticateUser = function (e, user) {
      var existingUser = false,
          newUser = false;

      if (existingUser) {
        this.trigger('uiSwitchPage', {name: 'appPage'});
      } else if (newUser) {
        this.trigger('uiSwitchPage', {name: 'signupPage'});
      } else {
        this.trigger('uiSwitchPage', {name: 'signinPage'});
      }
    };

    // initialize
    this.after('initialize', function () {
      this.on('authenicate', this.authenticateUser);
      this.authenticateUser();
    });
  }
});
