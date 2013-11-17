
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(formSubmit);

  function formSubmit() {
    // attributes

    // initialize
    this.after('initialize', function () {

      this.on('click touch', function(e) {
        console.log('submitted');
      });
    });
  }
});
