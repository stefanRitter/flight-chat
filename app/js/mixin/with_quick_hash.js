define(function() {
  'use strict';

  var withQuickHash = function () {
    
    this.quickHash = function(str) {
      var hash = 0,
          l, i, cha;

      str += Date.now().toString();
      l = str.length;

      for (i = 0; i < l; i+=1) {
        cha = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+cha;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    };
  };
  
  return withQuickHash;
});