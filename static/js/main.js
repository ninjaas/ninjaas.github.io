/**
 * Theme : Argo
 * Author: WPStrong
 * Url: http://themeforest.net/user/wpstrong
 * Version: 1.0
 */
var trigged=[],scrollTimeout;
jQuery(function($){

	$('#about-us .bar').attr('style','')
	//Trigger rotate
	// --------------------
	var rotateCycle = setInterval(function(){
		var thumbs = $('#header .thumb:not(.active)');
		var thumb_act = $('#header .active');
		if($('html').hasClass('csstransforms3d')){
				$(thumbs[getRandomInt(0,thumbs.length)]).addClass('active');
				$(thumb_act[getRandomInt(0,thumb_act.length)]).removeClass('active');
			}
		else{
			$(thumbs[getRandomInt(0,thumbs.length)]).addClass('active1').find('img:last').fadeOut();
				$(thumb_act[getRandomInt(0,thumb_act.length)]).removeClass('active1').find('img:last').fadeIn();
		}

	},3000);

	function triggerEvent(elem,fn,offset){
		if(!elem.offset()) return;
		var top = elem.offset().top;
		if((top-offset)<$(window).scrollTop()){
			fn(elem);
		}
	}

	//Window on scroll event
	//-------------------------------
	$(window).scroll(function(){
		var wtop = $(window).scrollTop();
		var header_heigh = $('#header').height();
		if(wtop<header_heigh){
			$('#navbar').removeClass('navbar-fixed-top');
			$('#header').css('margin-bottom',0);
		}
		clearTimeout(scrollTimeout);
			scrollTimeout=setTimeout(function(){

				triggerEvent($('.portfolio:first'),function(){
					if(trigged['portfolio']) return;
					$('.isotope .item').addClass('active');
					trigged['portfolio'] = true;
				},400);

				triggerEvent($('#about-us'),function(){
					if(trigged['about-us']) return;
					$('.progress .bar').each(function(){
						var $this=$(this);
						$this.css('width',$this.data('width')+'%');
					});
					trigged['about-us'] = true;
				},200);

			},50);

			triggerEvent($('#navbar'),function(elem){
				if(elem.hasClass('navbar-fixed-top')) return;
				 elem.addClass('navbar-fixed-top');
				 $('#header').css('margin-bottom',$('#navbar').height());
				},0)
	});

	//Window on resize event
	//------------------------------------------------
	$(window).resize(function(){
		var metro = $('#header .container.visible-phone:visible');
		var bricks = metro.find('.brick1');
		var size = metro.width()/2
		bricks.css({width:size,height:size});
		ser_equal_height();


	});

	$(window).trigger('resize');

	//Vertical scroll for blog section
	//------------------------------------------
	$(".blog_container").mCustomScrollbar({
		horizontalScroll:true,
		advanced:{
			autoExpandHorizontalScroll:true
		}
	});


	// Nav button click
	// -------------------------------------------------------

	$('#navbar .nav a:not(.external) , #header a.nav-item:not(.external) , #navbar .brand:not(.external),#btn_up').click(function(e){
		e.preventDefault();
		var des = '#'+$(this).attr('href').split('#')[1];
		if($('.navbar .nav-collapse').hasClass('in')){
			$('.navbar .btn-navbar').trigger('click');
		}
		goToSectionID(des);
	})

	/**
	 * Isotope filter
	 */
		// cache container
		var $container = $('.isotope');
		// initialize isotope
		$container.isotope({
		  // options...
		});

		// filter items when filter link is clicked
		$('.filter a').click(function(){
		  var selector = $(this).attr('data-filter');
		  $container.isotope({ filter: selector });
		  $('.filter a.active').removeClass('active');
		  $(this).addClass('active');
		  return false;
		});

	/**
	 * Portfolio hover effect
	 */
		$('#modalbox').on('show',function(){
			$('.modal-backdrop:first').fadeOut(function(){$(this).remove();})
			$('.rotate_container').fadeOut();
			$(this).css({position:'absolute',top:$(window).scrollTop()})
		})
		.on('hidden',function(){
			$(this).find('.modal-body').html('');
		});
		$(' .isotope > li ').each( function() {
			var $this = $(this);
			$(this).hoverdir({
				hoverDelay : 0
			});
			$this.find('a').on('click',function(e){
				e.preventDefault();
				$('body').append('<div class="modal-backdrop fade in"></div>');
				$('.rotate_container').show();
				$.get($(this).attr('href'),function(resutl){
					$('#modalbox .modal-body').html(resutl);
					$('#modalbox').modal('show');
				})

			});
		} );

	/**
	 * Init carousel
	 */
		$('.testimonial').carousel({interval:5000});



	/**
	 * Detect IE 10
	 */

	if (/*@cc_on!@*/false) {
   		$("html").addClass("ie10").removeClass('csstransforms3d');
   	}


})

function ser_equal_height(){

	//Equal height
	//---------------------------------------------------------
	var qHeight = 0;
	jQuery('.sev_list').each(function(){
		if(qHeight < jQuery(this).height()) qHeight = jQuery(this).height()
	})

	jQuery('.sev_list').each(function(){
		//var height = jQuery(this).closest('.entry-content').height()-30;
		jQuery(this).height(qHeight);
	})

	jQuery('[data-spy="scroll"]').each(function () {
    var $spy = jQuery(this).scrollspy('refresh')
    });
}

jQuery(window).load(function($){

	// Trigger window scroll event when page loaded
	// -------------------------------------------------------
	jQuery(window).trigger('scroll');
	ser_equal_height();


})

//Custom functions

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Scroll to section
 * @param  string des HTML identity of section block
 * @return void
 */
onanimate = false;
function goToSectionID(des){
	onanimate = true;
	var pos = (jQuery(des).length>0 )?jQuery(des).offset().top:0;
	jQuery('html,body').animate({scrollTop:pos},1000,function(){
		if(history.pushState){
			history.pushState(null,null,des);
		}else		window.location.hash = des;
		jQuery(window).scrollTop(pos);
		onanimate=false
	});
}

(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};

		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
			increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
			$self = $(this),
			loopCount = 0,
			value = settings.from,
			data = $self.data('countTo') || {};

			$self.data('countTo', data);

			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			// initialize the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};

	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
	// custom formatting example
	$('#count-number').data('countToOptions', {
		formatter: function (value, options) {
			return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
		}
	});

	// start all the timers
	$('.timer').each(count);

	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}
});
