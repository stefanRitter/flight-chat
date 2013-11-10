jQuery(function() {
  'use strict';
  
  // prefech backgrounds
  var imgOutdoor = new Image(),
      imgSpinnerBlack = new Image();
  
  imgOutdoor.src = '/images/outdoor.jpg';
  imgSpinnerBlack.src = '/images/spinner-white.png';
  imgSpinnerBlack.className = 'animRotateRound';

  // cicle background
  /*setInterval(function() {
   $('html').toggleClass('background-outdoor');
  }, 3000);*/

  $('button').on('click touch', function(e) {
    e.preventDefault();
    $(e.target).html(imgSpinnerBlack).prev('input').css('opacity', '0.8');
  });
});
