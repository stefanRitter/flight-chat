
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      appPage = require('page/app_page'),
      signinPage = require('page/signin_page'),
      signupPage = require('page/signup_page'),
      signupPage2 = require('page/signup_page2');

  return defineComponent(formSubmit);

  function formSubmit() {
    // attributes
    this.load = {
      'signinPage': signinPage,
      'appPage': appPage,
      'signupPage': signupPage,
      'signupPage2': signupPage2
    };

    // initialize
    this.after('initialize', function () {
      this.on('uiSwitchPage', function(e, page) {
        this.load[page.name]();
      });
    });
  }
});
