var MyApp = (function(){
  // global
  var stickyNav = false;
  var $window = $(window);


  var watchScroll = function(){
    $window.scroll(function(){
      var $navbar = $('#navbar');
      if( stickyNav === false && $window.scrollTop() >= 505){
        $navbar.addClass('stick');
        stickyNav = true;
        console.log('STICK!');
      } else if (stickyNav === true && $window.scrollTop() < 505) {
        $navbar.removeClass('stick');
        stickyNav = false;
      }
    });
  };

  var init = function(){
    watchScroll();
  };

  return {
    init : init
  }
})();