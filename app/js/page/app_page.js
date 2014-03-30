
define(function (require) {
  'use strict';

  // dependencies
  var templates = require('js/templates'),
      template = templates['templates/app_view.html'].render(),
      socketio = require('component_data/socketio_com'),
      conversations = require('component_data/conversations'),
      sectionConversations = require('component_ui/section_conversations');

  // exports
  return initialize;

  // module function
  function initialize() {
    var app = $('#app');
    app.fadeOut(function() {
      app.html(template);

      // data
      socketio.attachTo(document);
      conversations.attachTo(document);

      // ui
      sectionConversations.attachTo('#messageSection');

      app.fadeIn();
    });
  }
});
