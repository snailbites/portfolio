var MyApp = (function(){
	// global vars
	var $window = $(window),
		isStickyNav = false,
		isDefaultBg = true;

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
			// change background color
			if(isDefaultBg === true && $scrollTop >= 250){
                $body.changeBackground('#E9E9E9');
                $navbarUL.changeBackground('#51A0CD');
                isDefaultBg = false;
            } else if(isDefaultBg === false && $scrollTop < 250){
                $body.changeBackground('#24345A');
                $navbarUL.changeBackground('#BE342A');
                isDefaultBg = true;
            }
            // sticky nav
            if( isStickyNav === false && $scrollTop >= 505 ){
                $navbar.addClass('stick');
                isStickyNav = true;
            }
            else if (isStickyNav === true && $scrollTop < 505){ // check at 1100
                $navbar.removeClass('stick');
                isStickyNav = false;
            }
            /*
            // stick the nav again at footer
            if( isFooter === false && $scrollTop >= 505 ){
                $navbar.addClass('stick');
                isStickyNav = true;
            }
            else if (isFooter === true && $scrollTop < 505){ // check at 1100
                $navbar.removeClass('stick');
                isStickyNav = false;
            }
            */
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
