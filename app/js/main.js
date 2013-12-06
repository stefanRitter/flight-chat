'use strict';

requirejs.config({
  baseUrl: '',
  paths: {
    'flight': 'bower_components/flight',
    'component_ui': 'js/component_ui',
    'component_data': 'js/component_data',
    'mixin': 'js/mixin',
    'page': 'js/page'
  }
});

require(
  [
    'flight/lib/compose',
    'flight/lib/registry',
    'flight/lib/advice',
    'flight/lib/logger',
    'flight/lib/debug'
  ],

  function(compose, registry, advice, withLogging, debug) {
    debug.enable(true);
    compose.mixin(registry, [advice.withAdvice, withLogging]);

    window.FastClick.attach(document.body);

    require(['page/default'], function(initializePage) {
      initializePage();
    });
  }
);
