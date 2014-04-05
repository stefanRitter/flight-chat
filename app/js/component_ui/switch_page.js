define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      appPage = require('page/app_page'),
      signinPage = require('page/signin_page');

  return defineComponent(switchPage);

  function switchPage() {
    // attributes
    this.defaultAttrs({
      'signinPage': signinPage,
      'appPage': appPage
    });

    // initialize
    this.after('initialize', function () {
      this.on('uiSwitchPage', function(e, page) {
        this.attr[page.name]();
      });
    });
  }
});
