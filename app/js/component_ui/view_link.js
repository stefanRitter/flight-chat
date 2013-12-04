
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      templates = require('js/templates'),
      formSubmit = require('component_ui/form_submit');

  return defineComponent(viewLink);

  function viewLink() {
    var _this = this;

    this.defaultAttrs({
      linkSelector: '.js-view-link'
    });

    this.load = {
      chatView: function($link) {
        var userId = $link.data('userid'),
            conversationId = $link.data('conversationid'),
            template = templates['templates/chat_view.html'].render({userId: userId, conversationId: conversationId});

        $('#app-view').html(template).addClass('show');
        formSubmit.attachTo('#app-view button[type=submit]');
      },
      imageUploaderView: function($link) {
        console.error('imageUploaderView not implemted yet');
      },
      back: function() {
        $('#app-view').removeClass('show');
      }
    };

    this.handleClick = function(e) {
      e.preventDefault();
      var $link = $(e.target).closest('.js-view-link');
      _this.load[$link.attr('href')]($link);
    };

    // initialize
    this.after('initialize', function () {
      $('#app-view').css({display: 'block'});

      this.on('click touch', {
        linkSelector: this.handleClick
      });
    });
  }
});
