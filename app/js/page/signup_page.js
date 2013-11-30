
define(function (require) {
  'use strict';

  // dependencies
  var formSubmit = require('component_ui/form_submit'),
      signup1handler = require('component_data/signup'),
      pageLink = require('component_ui/page_link');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#signupPage').fadeIn();
    pageLink.attachTo('#signupPage .js-page-link');
    formSubmit.attachTo('#signupPage button');
    signup1handler.attachTo(document);
  }
});
