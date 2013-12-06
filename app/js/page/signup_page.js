
define(function (require) {
  'use strict';

  // dependencies
  var signupHandler = require('component_data/signup'),
      pageLink = require('component_ui/page_link');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#signupPage').fadeIn();
    pageLink.attachTo('#signupPage .js-page-link');
    signupHandler.attachTo(document);
  }
});
