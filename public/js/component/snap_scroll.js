
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(snapScroll);

  function snapScroll () {
    // initialize
    this.after('initialize', function () {
      console.log('Initializing Add Task form');
    });
  }
});
