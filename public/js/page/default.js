
define(function (require) {
  'use strict';

  /**
   * Module dependencies
   */

  var switchSection = require('component_ui/switch_section');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    FastClick.attach(document.body);
    switchSection.attachTo('header.main-header li');
  }
});
