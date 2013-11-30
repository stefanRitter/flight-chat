
define(function (require) {
  'use strict';

  // dependencies
  var formSubmit = require('component_ui/form_submit'),
      appLink = require('component_ui/app_link');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#signinPage').fadeIn();
    appLink.attachTo('#signinPage .js-app-link');
    formSubmit.attachTo('#signinPage button');
  }
});
