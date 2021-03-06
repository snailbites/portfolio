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


    var _pageState = {
        state : 'home', // home,about,work,footer
    }

	// dynamically set padding of nav to home slide
	var setNavPadding = function(){
		var offset = $('.sidebar').offset().left;
		$('#navbar').find('ul').css('paddingLeft',offset);
	};

    // click events for portfolio
    var bindSidebarEvents = function(){
        $('.sidebar').on('click','a',function(){
            var $this = $(this),
                $data = $this.data();

            // sidebar functionality
            $('.sidebar li a').removeClass('selected');
            $this.addClass('selected');

            // switch image
            $('#screenshot').fadeOut(250,function(){
                var $this = $(this),
                    $preloader = $('.preloader');
                $preloader.show();
                $.when($this.attr({
                    'data-project' : $data.project,
                    'src' : "/img/" + $data.project + ".png"
                })).done(function(){
                    $this.fadeIn(150);
                    $preloader.fadeOut(100);
                    $this.parent('a').attr('href',$data.link);
                });
            });

            // fetch caption text
            $.ajax({
                url: "captions/" + $data.project + "/index.html",
                dataType: 'html',
                success: function(response){
                    $('#caption').html(response);
                }
            });
        });
    }
    // caption hover
    var bindCaptionEvents = function(){
        $('#work figure').hover(
            function(){
                $('#caption').stop().fadeIn(150);
            },
            function(){
                $('#caption').stop().fadeOut(150);
            }
        );
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
            //console.log($(this).width())
			setNavPadding();
		});
	};
	// window scrolling events
	var watchScroll = function(){
        $window.scroll(function(){
            setScrollItems($window.scrollTop());
        });
    };
    var renderState = function (_pageState){
        switch(_pageState.state){
            case 'home' : _setHomeState();
        }
    };
    var _setHomeState = function(){
        $navbar.find('a').removeClass('selected');
        $body.changeBackground('#24345A');
        $navbarUL.changeBackground('#BE342A');
    };
    var preparePage = function(scrollTop){
        //console.log(scrollTop)
        if(scrollTop > 1150){
            $navbar.find('.link-work').addClass('selected');
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
            if ( scrollTop >= 960 ){
                $navbar.find('a').removeClass('selected');
                $navbar.find('.link-work').addClass('selected');
            } else {
                $navbar.find('a').removeClass('selected');
                $navbar.find('.link-about').addClass('selected');
            }
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
            $navbar.find('a').removeClass('selected');
            $navbar.find('.link-about').addClass('selected');
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
            $navbar.find('a').removeClass('selected');
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
        }, 10 );
    };
    // temp
    var turnOffBlog = function(){
        $('#navbar').on('hover click', '.link-blog', function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    };
    var init = function(){
        setScrollItems();
        setNavPadding();
        watchScroll();
        watchResize();
        bindNavEvents();
        bindSidebarEvents();
        bindCaptionEvents();
        turnOffBlog();
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
    $.fn.preload = function() {
    return this.each(function(){
        $('<img/>')[0].src = this;
    });
    }
})(jQuery);