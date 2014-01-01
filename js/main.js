var MyApp = (function(){
	// global vars
	var $window = $(window),
	stickyNav = false;

	//// PRIVATE FUNCS


	//// PUBLIC FUNCTIONS
	// window scrolling events
	var watchScroll = function(){
		$window.scroll(function(){
			var $navbar = $('#navbar'),
			$body = $('body');
			if( stickyNav === false && $window.scrollTop() >= 505){
				$navbar.addClass('stick');
				stickyNav = true;
				$body.changeBackground('#E9E9E9');
				$navbar.changeBackground('#51A0CD').addClass('about');
			}
			else if (stickyNav === true && $window.scrollTop() < 505) {
				$navbar.removeClass('stick');
				stickyNav = false;
				$body.changeBackground('#24345A');
				$navbar.changeBackground('#BE342A').removeClass('about');
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

// jQuery helper plugins
(function($){
	$.fn.changeBackground = function(hex){
		var fadeDuration = 200;
		return this.animate({
			backgroundColor : hex
		}, fadeDuration );
	}
})(jQuery);
