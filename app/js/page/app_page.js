
define(function (require) {
  'use strict';

  // dependencies
  var templates = require('js/templates'),
      template = templates['templates/app_view.html'].render(),
      socketio = require('component_data/socketio_com'),
      conversations = require('component_data/conversations'),
      conversationsView = require('component_ui/conversations_view'),
      viewLink = require('component_ui/view_link');

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
      conversationsView.attachTo('#conversations');
      viewLink.attachTo(document);

      app.fadeIn();
    });
  }
});
