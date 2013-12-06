
define(function (require) {
  'use strict';

  // dependencies
  var pageLink = require('component_ui/page_link');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#signinPage').fadeIn();
    pageLink.attachTo('#signinPage .js-page-link');
  }
});
