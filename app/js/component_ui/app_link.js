
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(appLink);

  function appLink() {
    this.link = '';

    // initialize
    this.after('initialize', function () {
      this.link = this.$node.attr('href');
      console.log(this.link);
      
      this.on('click touch', function(e) {
        e.preventDefault();
        this.trigger('uiSwitchPage', {name: this.link} );
      });
    });
  }
});