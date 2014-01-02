var MyApp = (function(){
	// global vars
	var $window = $(window),
	stickyNav = false;

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
	// dynamically set padding of nav to home slide
	var setNavPadding = function(){
		var offset = $('#home').offset().left;
		$('#navbar').find('ul').css('paddingLeft',offset);
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
			console.log($window.scrollTop());
			var $navbar = $('#navbar'),
			$body = $('body');
			if( stickyNav === false && $window.scrollTop() >= 505){
				$navbar.addClass('stick');
				stickyNav = true;
				$body.changeBackground('#E9E9E9');
				$navbar.find('ul').changeBackground('#51A0CD').addClass('about');
			}
			else if (stickyNav === true && $window.scrollTop() < 505) {
				$navbar.removeClass('stick');
				stickyNav = false;
				$body.changeBackground('#24345A');
				$navbar.find('ul').changeBackground('#BE342A').removeClass('about');
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
