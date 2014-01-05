var MyApp = (function(){
	// global vars
	var $scrollTop = 0,
        isStickyNav = false,
        isDefaultBg = true,
        isBottom = false,
        isTop = true;

    // cached jquery objs
    var $window = $(window),
        $navbar = $('#navbar'),
        $navbarUL = $navbar.find('ul'),
        $body = $('body');

	// dynamically set padding of nav to home slide
	var setNavPadding = function(){
		var offset = $('.sidebar').offset().left;
		$('#navbar').find('ul').css('paddingLeft',offset);
	};

    // click events for portfolio
    var bindSidebarEvents = function(){
        $('.sidebar').on('click','a',function(){
            var $this = $(this),
                $project = $this.data('project');

            // sidebar functionality
            $('.sidebar li a').removeClass('selected');
            $this.addClass('selected');

            // switch image
            $('#screenshot').fadeOut(250,function(){
                var $this = $(this);
                $this.attr('data-project', $project);
                $this.attr('src', "img/screenshots/" + $project + ".png").fadeIn(150);
            });

            // fetch caption text
            $.ajax({
                url: "captions/" + $project + "/index.html",
                dataType: 'html',
                success: function(response){
                    $('#caption').html(response);
                }
            });
        });
    }
    // caption hover
    var bindCaptionEvents = function(){
        $('#screenshot').on('mouseover mouseout',function(e){
            var $caption = $('#caption');
            e.stopPropagation();
            e.preventDefault();
            switch(e.type){
                case 'mouseover' : $caption.fadeIn(250); break;
                case 'mouseout' : $caption.fadeOut(250); break;
            }
        });
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
                case "#blog"  : return false;
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
        bindCaptionEvents();
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
