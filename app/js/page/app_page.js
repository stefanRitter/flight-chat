
define(function (require) {
  'use strict';

  // dependencies
  var switchSection = require('component_ui/switch_section'),
      chatToggle = require('component_ui/chat_toggle'),
      formSubmit = require('component_ui/form_submit');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#appPage').fadeIn();
    $('#signupPage, #signinPage').remove();
    
    switchSection.attachTo('header.main-header li');
    formSubmit.attachTo('#appPage button[type=submit]');
    chatToggle.attachTo('.chat');
  }
});
