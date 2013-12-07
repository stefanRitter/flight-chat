
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      appPage = require('page/app_page'),
      signinPage = require('page/signin_page'),
      signupPage = require('page/signup_page');

  return defineComponent(switchPage);

  function switchPage() {
    // attributes
    this.load = {
      'signinPage': signinPage,
      'appPage': appPage,
      'signupPage': signupPage
    };

    // initialize
    this.after('initialize', function () {
      this.on('uiSwitchPage', function(e, page) {
        this.load[page.name]();
      });
    });
  }
});
