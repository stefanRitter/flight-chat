
define(function() {
  'use strict';

  var withValidateEmail = function () {
    
    this.validateEmail = function (email) {
      return email.match(/^[\S]+@[\S]+\.[\S]+$/);
    };
  };
  
  return withValidateEmail;
});
