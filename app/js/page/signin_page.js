
define(function (require) {
  'use strict';

  // dependencies
  var linkPage = require('component_ui/link_page');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#signinPage').fadeIn();
    linkPage.attachTo('#signinPage .js-page-link');
  }
});
