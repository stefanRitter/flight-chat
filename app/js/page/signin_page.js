
define(function (require) {
  'use strict';

  var templates = require('js/templates'),
      template = templates['templates/login_view.html'].render();

  return initialize;

  function initialize() {
    $('#app').fadeOut(function() {
      $('#app').html(template).fadeIn();
    });
  }
});
