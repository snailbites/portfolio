var MyApp = (function(){
	// global vars
	var $window = $(window),
        $navbar = $('#navbar'),
        $navbarUL = $navbar.find('ul'),
        $body = $('body'),
        $scrollTop = 0,
        isStickyNav = false,
        isDefaultBg = true,
        isBottom = false,
        isTop = true;

	// dynamically set padding of nav to home slide
	var setNavPadding = function(){
		var offset = $('.sidebar').offset().left;
		$('#navbar').find('ul').css('paddingLeft',offset);
	};
    var setBackgroundColor = function(){
        setTimeout(function(){
            _preparePage($('body').scrollTop());
        }, 50);
    };
    // click events for portfolio
    var bindSidebarEvents = function(){
        $('.sidebar').on('click','a',function(){
            $('.sidebar li a').removeClass('selected');
            $(this).addClass('selected');
        })
    }
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
        $window.scroll(function(){
            setScrollItems($window.scrollTop());
        });
    };
    var preparePage = function(scrollTop){
        if(scrollTop > 1150){
            console.log('isStickyNav: ' + isStickyNav)
            if(isStickyNav){
                $navbar.removeClass('stick').addClass('bottom');
                isStickyNav = false;
            } else  {
                $navbar.addClass('bottom');
            }
            if( isDefaultBg ){
                $body.changeBackground('#E9E9E9');
                $navbarUL.changeBackground('#51A0CD');
                isDefaultBg = false;
            }
        } else if ( scrollTop >= 505 ){
            if(!isStickyNav){
                $navbar.addClass('stick').removeClass('bottom');
                isStickyNav = true;
            }
            if( isDefaultBg ){
                $body.changeBackground('#E9E9E9');
                $navbarUL.changeBackground('#51A0CD');
                isDefaultBg = false;
            }
        } else if ( scrollTop >= 250 ){
            if( isStickyNav ){
                $navbar.removeClass('stick');
                isStickyNav = false;
            }
            if( isDefaultBg ){
                $body.changeBackground('#E9E9E9');
                $navbarUL.changeBackground('#51A0CD');
                isDefaultBg = false;
            }
        } else if ( scrollTop < 250 ){
            if( !isDefaultBg ){
                $body.changeBackground('#24345A');
                $navbarUL.changeBackground('#BE342A');
                isDefaultBg = true;
            }
        }
    };
    var setScrollItems = function(){
        setTimeout(function(){
            preparePage($window.scrollTop());
        }, 100 );
    };
    var init = function(){
        setScrollItems();
        setNavPadding();
        watchScroll();
        watchResize();
        bindNavEvents();
        bindSidebarEvents();
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
