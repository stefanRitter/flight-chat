
define(function (require) {
  'use strict';

  // dependencies
  var signupHandler = require('component_data/signup'),
      linkPage = require('component_ui/link_page');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#signupPage').fadeIn();
    linkPage.attachTo('#signupPage .js-page-link');
    signupHandler.attachTo(document);
  }
});
