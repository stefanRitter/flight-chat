
define(function (require) {
  'use strict';

  // dependencies
  var switchSection = require('component_ui/switch_section');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#appPage').fadeIn();
    switchSection.attachTo('header.main-header li');
  }
});
