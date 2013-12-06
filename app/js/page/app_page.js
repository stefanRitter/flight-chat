
define(function (require) {
  'use strict';

  // dependencies
  var switchSection = require('component_ui/switch_section'),
      linkView = require('component_ui/link_view'),
      conversations = require('component_data/conversations');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#appPage').fadeIn();
    $('#signupPage, #signinPage').remove();

    // data
    conversations.attachTo(document);

    // ui
    switchSection.attachTo('header.main-header li');
    linkView.attachTo(document);
  }
});
