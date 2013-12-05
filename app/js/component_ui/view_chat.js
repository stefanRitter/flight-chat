
define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component'),
      templates = require('js/templates'),
      formSubmit = require('component_ui/form_submit');

  return defineComponent(viewLink);

  function viewLink() {
    var _this = this;

    this.defaultAttrs({
    });

    this.destroyView = function() {
      console.debug('teard down view');
      this.teardown();
    };

    // initialize
    this.after('initialize', function () {

      var userId = this.attr.userId,
          conversationId = this.attr.conversationId,
          template = templates['templates/chat_view.html'].render({userId: userId, conversationId: conversationId});

      this.$node.html(template).addClass('show');
      formSubmit.attachTo('#app-view button[type=submit]');

      this.on('uiDestroyView', this.destroyView);
    });
  }
});
