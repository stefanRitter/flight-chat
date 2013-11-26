
define(function (require) {
  'use strict';

  // dependencies
  var formSubmit = require('component_ui/form_submit'),
      signup1handler = require('component_data/signup_1');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#signupPage').fadeIn();

    formSubmit.attachTo('#signupPage button');
    signup1handler.attachTo(document);
  }
});
