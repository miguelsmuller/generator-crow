jQuery(document).ready(function($) {
  'use strict';

  /***************** PREVENT DEFAULT CLICK ON # ******************/
  $('[href="#"]').click(function(e){
    e.preventDefault();
  });


  /***************** SMOOTH SCROLLING ******************/
  $('a[href*=#]:not([href=#]):not([data-toggle="tab"])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var $padding = parseInt($(this).attr('data-padding'), 10);
        $padding = (($padding >= 1) ? $padding : 0);
        $('html,body').animate({
            scrollTop: target.offset().top - $padding
        }, 1000);
        return false;
      }
    }
  });
});
