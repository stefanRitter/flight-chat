
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(viewLink);

  function viewLink() {
    this.link = '';

    this.load = {
      chatView: function() {
        console.log('chatView');
        $('#chatView').addClass('show');
      },
      imageUploaderView: function() {

      },
      back: function() {
        $('.app-view').removeClass('show');
      }
    };

    // initialize
    this.after('initialize', function () {
      this.link = this.$node.attr('href');
      $('#chatView, #imageUploaderView').css({display: 'block'});

      this.on('click touch', function(e) {
        e.preventDefault();
        this.load[this.link]();
      });
    });
  }
});
