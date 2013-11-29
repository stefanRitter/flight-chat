
define(function (require) {
  'use strict';

  // dependencies
  var switchSection = require('component_ui/switch_section'),
      toggleChat = require('component_ui/toggle_chat');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#appPage').fadeIn();
    switchSection.attachTo('header.main-header li');
    toggleChat.attachTo('.chat');
  }
});
