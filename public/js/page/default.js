
define(function (require) {
  'use strict';

  // dependencies
  var switchPage = require('component_ui/switch_page'),
      authenticate = require('component_data/authenticate');


  // exports
  return initialize;


  // module function
  function initialize() {
    switchPage.attachTo(document);
    authenticate.attachTo(document);
  }
});
