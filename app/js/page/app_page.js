
define(function (require) {
  'use strict';

  // dependencies
  var socketio = require('component_data/socketio_com'),
      conversations = require('component_data/conversations'),
      switchSection = require('component_ui/switch_section'),
      linkView = require('component_ui/link_view'),
      sectionConversations = require('component_ui/section_conversations');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('.app-page').hide();
    $('#appPage').fadeIn();
    $('#signupPage, #signinPage').remove();

    // data
    socketio.attachTo(document);
    conversations.attachTo(document);

    // ui
    linkView.attachTo(document);
    switchSection.attachTo('header.main-header li');
    sectionConversations.attachTo('#messageSection');
  }
});
