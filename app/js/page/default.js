
define(function (require) {
  'use strict';

  // dependencies
  var switchPage = require('component_ui/switch_page'),
      authenticate = require('component_data/authenticate_user'),
      appLinks = require('component_ui/app_link');


  // exports
  return initialize;


  // module function
  function initialize() {
    appLinks.attachTo($('.js-app-link'));
    $('#firstLoad').remove();
    switchPage.attachTo(document);
    authenticate.attachTo(document);
  }
});
