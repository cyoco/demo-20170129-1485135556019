var $body,
	windowHeight,
	windowWidth,
	$headerRow,
	headerRowHeight,
	$userMenuButt,
	$navOpen,
	$navClose,
	$cartOpen,
	$cartClose,
	$homeSlider,
	$chosenTarget,
	$navSidebar,
	$cartSidebar,
	animationArray = [],
	parallaxArray = [],
	$parallaxContainer,
	$parallaxLayer,
	$parallaxWrap,
	$parallaxTarget,
	$parallaxPost,
	parallaxRatio,
	mouseInAside = false,
	mediaPoint1 = 1024,
	mediaPoint2 = 768,
	mediaPoint3 = 480,
	mediaPoint4 = 320;

$(document).ready(function ($) {
	$body = $('body');
	$userMenuButt = $('#user_menu_butt');
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	$navOpen = $('.navOpen');
	$navClose = $('.navClose');
	$cartOpen = $('.cartOpen');
	$cartClose = $('.cartClose');
	$homeSlider = $('.homeSlider');
	$chosenTarget = $('.chosenTarget');
	$navSidebar = $('.navSidebar');
	$cartSidebar = $('.cartSidebar');
	$parallaxContainer = $('.parallaxContainer');
	$parallaxLayer = $('.parallaxLayer');
	parallaxRatio = windowWidth / 3000;
	$parallaxTarget = $('.parallaxTarget');
	$parallaxWrap = $('.parallaxWrap');
	$parallaxPost = $('.parallaxPost');
	$headerRow = $('.headerRow');
	headerRowHeight = $headerRow.height();

	// sidebars
	// open and close on link's click
	$navOpen.on('click', function () {
		$body.toggleClass('nav_open');

		if (windowWidth <= mediaPoint2) {
			$body.removeClass('cart_open');
		}
		return false;
	});

	$navClose.on('click', function () {
		$body.removeClass('nav_open');
		return false;
	});

	$cartOpen.on('click', function () {
		$body.toggleClass('cart_open');

		if (windowWidth <= mediaPoint2) {
			$body.removeClass('nav_open');
		}
		return false;
	});

	$cartClose.on('click', function () {
		$body.removeClass('cart_open');
		return false;
	});

	// close when mouse outside

	$navSidebar.hover(function () {
		mouseInAside = true;
	}, function () {
		mouseInAside = false;
	});

	$cartSidebar.hover(function () {
		mouseInAside = true;
	}, function () {
		mouseInAside = false;
	});

	$navOpen.hover(function () {
		mouseInAside = true;
	}, function () {
		mouseInAside = false;
	});

	$cartOpen.hover(function () {
		mouseInAside = true;
	}, function () {
		mouseInAside = false;
	});

	$body.on('click', function () {
		if (!mouseInAside) {
			$body.removeClass('nav_open cart_open');
		}
	});

	// select styling
	$chosenTarget.chosen({
		disable_search_threshold: 10,
		width: "100%",
		inherit_select_classes: true
	});

	// parallax

	$parallaxContainer.on('mousemove', function (e) {
		parallaxMouse(e.pageX, e.pageY);
	});
});

$(window).on('load', function () {
	loadFunc();
	parallaxScroll();
});

$(window).on('resize', function () {
	resizeFunc();
});

$(window).on('scroll', function () {
	scrollFunc();
});

function loadFunc() {
	updateSizes();
	$homeSlider.bxSlider({
		controls: false,
		mode: 'fade',
		onSliderLoad:function() {
			setTimeout(function() {
				animationArray = [];
				$('.animationTarget').each(function (indx, element) {
					var subAnimationArray = {
						'offset': $(element).offset().top,
						'dataAttr': $(element).attr('data-animation_name'),
						'animationState': false,
						'element': element
					};
					animationArray.push(subAnimationArray);
				});
				playAnimation($(window).scrollTop(),0);
				playAnimation($(window).scrollTop(),1);
			},100);
		}
	});

	animationArray = [];
	$('.animationTarget').each(function (indx, element) {
		var subAnimationArray = {
			'offset': $(element).offset().top,
			'dataAttr': $(element).attr('data-animation_name'),
			'animationState': false,
			'element': element
		};
		animationArray.push(subAnimationArray);
	});

	updateSizes();
	createParallaxArray();

	playAnimation($(window).scrollTop(),0);
	playAnimation($(window).scrollTop(),1);
}
function resizeFunc() {
	updateSizes();

	if ($homeSlider.length) {
		$homeSlider.reloadSlider();
	}
	animationArray = [];
	$('.animationTarget').each(function (indx, element) {
		var subAnimationArray = {
			'offset': $(element).offset().top,
			'dataAttr': $(element).attr('data-animation_name'),
			'animationState': false,
			'element': element
		};
		animationArray.push(subAnimationArray);
	});
	parallaxScroll($(window).scrollTop());
	playAnimation($(window).scrollTop(),0);
}

function scrollFunc() {
	parallaxScroll($(window).scrollTop());
	playAnimation($(window).scrollTop(),1);
}

function updateSizes() {
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	parallaxRatio = windowWidth / 3000;
}

function createParallaxArray() {
	$parallaxLayer.each(function (index, element) {
		var layer = $(this),
			layerIndex = layer.attr('data-array-index');
		parallaxArray[layerIndex] = {
			layer: layer,
			layerDepth: layer.attr('data-layer-depth'),
			layerOffsetLeft: layer.offset().left,
			layerOffsetTop: layer.offset().top,
			layerWidth: layer.innerWidth(),
			layerHeight: layer.innerHeight()
		};
	});
}

function parallaxMouse(mouseX, mouseY) {
	parallaxArray.forEach(function (item, index) {
		var x = -(mouseX - (item.layerOffsetLeft + item.layerWidth / 2)) * item.layerDepth * parallaxRatio,
			y = -(mouseY - (item.layerOffsetTop + item.layerHeight / 2)) * item.layerDepth * parallaxRatio;
		item.layer.css('transform', 'translate(' + x + 'px,' + y + 'px)');
	});
}

function parallaxScroll(scrollY) {
	var distance = scrollY * 0.6;
	$parallaxWrap.css({
		'position': 'fixed',
		'transform': 'translate(0,' + distance + 'px)',
		'top':headerRowHeight,
		'left':'0'
	});
	$parallaxPost.css({
		'margin-top': $parallaxTarget.innerHeight()
	});
}

function playAnimation(position, version) {
	if (animationArray.length) {
		for (var i = 0; i < animationArray.length; i++) {

			if (position > (animationArray[i].offset - (windowHeight/1.1) * version) && animationArray[i].animationState == false) {
				animationArray[i].animation_state = true;

				if (animationArray[i].dataAttr == 'fadeIn') {
					$(animationArray[i].element).addClass('show_mod');
				}
			}
		}
	}
}

