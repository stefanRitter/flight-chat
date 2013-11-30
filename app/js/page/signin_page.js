
define(function (require) {
  'use strict';

  // dependencies
  var formSubmit = require('component_ui/form_submit'),
      pageLink = require('component_ui/page_link');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#signinPage').fadeIn();
    pageLink.attachTo('#signinPage .js-page-link');
    formSubmit.attachTo('#signinPage button');
  }
});
