
define(function (require) {
  'use strict';

  // dependencies
  var switchSection = require('component_ui/switch_section'),
      viewLink = require('component_ui/view_link'),
      formSubmit = require('component_ui/form_submit');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#appPage').fadeIn();
    $('#signupPage, #signinPage').remove();
    
    switchSection.attachTo('header.main-header li');
    formSubmit.attachTo('button[type=submit]');
    viewLink.attachTo('.js-view-link');
  }
});
