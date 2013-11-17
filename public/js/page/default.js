
define(function (require) {
  'use strict';

  // dependencies
  var switchPage = require('component_ui/switch_page'),
      authenticate = require('component_data/authenticate_user');


  // exports
  return initialize;


  // module function
  function initialize() {
    $('#firstLoad').remove();
    switchPage.attachTo(document);
    authenticate.attachTo(document);
  }
});
