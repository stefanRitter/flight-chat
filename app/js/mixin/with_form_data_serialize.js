
define(function() {
  'use strict';

  var withFormDataSerialize = function () {
    
    this.serialize = function(formData) {
      var data = {},
          len = formData.length,
          i;
      
      for(i = 0; i < len; i+=1) {
        data[formData[i].name] = formData[i].value;
      }
      return data;
    };
  };
  
  return withFormDataSerialize;
});
