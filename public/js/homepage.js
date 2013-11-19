jQuery(function() {
  'use strict';
  
  // prefech backgrounds
  var imgOutdoor = new Image(),
      imgSpinnerBlack = new Image();
  
  //imgOutdoor.src = '/img/outdoor.jpg';
  imgSpinnerBlack.src = '/img/spinner-white.png';
  imgSpinnerBlack.className = 'animRotateRound';

  // cicle background
  /*setInterval(function() {
   $('html').toggleClass('background-outdoor');
  }, 3000);*/

  $('button').on('click touch', function(e) {
    var email = $('input[type=email]').val();
    if (validateEmail(email)) {
      $(e.target).html(imgSpinnerBlack).prev('input').css('opacity', '0.8');
      $('.error').addClass('hidden');
    } else {
      e.preventDefault();
      $('.error').removeClass('hidden');
    }
  });

  // helpers
  function validateEmail(email) {
    return email.match(/^[\S]+@[\S]+\.[\S]+$/);
  }
});
