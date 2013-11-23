
define(function (require) {
  'use strict';

  // dependencies
  var formSubmit = require('component_ui/form_submit');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#signinPage').fadeIn();

    formSubmit.attachTo('#signinPage button');
  }
});
