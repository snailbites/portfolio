var MyApp = (function(){
	// global vars
	var $window = $(window),
    isStickyNav = false,
    isDefaultBg = true,
    isBottom = false,
    isTop = true;

	// dynamically set padding of nav to home slide
	var setNavPadding = function(){
		var offset = $('.sidebar').offset().left;
		$('#navbar').find('ul').css('paddingLeft',offset);
	};

	// nav clicks
	var bindNavEvents = function() {
		$('#navbar').on('click','a',function(e){
			var $body = $('body');
			e.preventDefault();
			e.stopPropagation();

			switch ($(this).attr('href')){
				case "#about" : $body.animate({ scrollTop : '505px' }, 350 );
                break;
                case "#work"  : $body.animate({ scrollTop : '1140px' }, 350 );
                break;
                case "#blog"  : console.log('test');
                break;
                default 	  : break;
            }
        })
	};
	// on resize browser
	var watchResize = function(){
		$window.on('resize',function(){
			setNavPadding();
		});
	};
	// window scrolling events
	var watchScroll = function(){
		var $navbar = $('#navbar'),
            $navbarUL = $('#navbarUL'),
            $scrollTop = 0,
            $body = $('body');
        $window.scroll(function(){
            $scrollTop = $window.scrollTop();
            if($scrollTop > 1150){
                if(isStickyNav){
                    $navbar.removeClass('stick').addClass('bottom');
                    isStickyNav = false;
                }
            } else if ( $scrollTop >= 505 ){
                if(!isStickyNav){
                    $navbar.addClass('stick').removeClass('bottom');
                    isStickyNav = true;
                }
            } else if ( $scrollTop >= 250 ){
                if( isStickyNav ){
                    $navbar.removeClass('stick');
                    isStickyNav = false;
                }
                if( isDefaultBg ){
                    $body.changeBackground('#E9E9E9');
                    $navbarUL.changeBackground('#51A0CD');
                    isDefaultBg = false;
                }
            } else if ( $scrollTop < 250 ){
                if( !isDefaultBg ){
                    $body.changeBackground('#24345A');
                    $navbarUL.changeBackground('#BE342A');
                    isDefaultBg = true;
                }
            }
        });
    };
    var init = function(){
        watchScroll();
        watchResize();
        setNavPadding();
        bindNavEvents();
    };

    return {
      init : init
    }
})();

// jQuery helper plugins
(function($){
	$.fn.changeBackground = function(hex){
		var fadeDuration = 200;
		return this.animate({
			backgroundColor : hex
		}, fadeDuration );
	}
})(jQuery);
