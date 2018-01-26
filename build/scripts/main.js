'use strict';

/**
* Check scroll-bar width
* exemple ->   let scroll = $.scrollbarWidth();
*/
$.scrollbarWidth = function () {
    var a, b, c;if (c === undefined) {
        a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b = a.children();c = b.innerWidth() - b.height(99).innerWidth();a.remove();
    }return c;
};

/**
* Scroll to the block
* @param {block} str - For what we click
* @param {targetBlock} str - to what we should scroll
*/
function scrollUp(block, targetBlock) {
    $(block).click(function (e) {
        var target = $(targetBlock).offset().top;

        $('body,html').stop().animate({ scrollTop: target }, 800);
        return false;

        e.preventDefault();
    });
}

/**
* Scroll animation
* @param {item} jquery obj - Wrapper for class 'animate-it';
*/
function animationBlock(item) {

    $(window).scroll(function () {
        checkForAnimate();
    });

    function checkForAnimate() {
        var bottomCheck = $(window).height() + $(window).scrollTop();
        var windowTop = $(window).scrollTop() + $(window).height() / 1.5;
        item.each(function () {
            if (windowTop > $(this).offset().top || bottomCheck > $('body').height() * 0.98) {

                var itemSect = $(this);
                var point = 0;
                itemSect.find('.animate-it').addClass('animated');

                var timer = setInterval(function () {
                    itemSect.find('.animate-delay').eq(point).addClass('animated');
                    point++;
                    if (itemSect.find('.animate-delay').length == point) {
                        clearInterval(timer);
                    }
                }, 200);
            }
        });
    }
    checkForAnimate();
}

/**
* GO TO href (smooth)
*/
function goTo() {
    $('.header-menu a').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var target = $(href).offset().top - 65;
        $('body,html').animate({ scrollTop: target }, 500);
    });
}

/**
* Cut text script
* (Add to  div class "cut-text" width data-attr "data-cut"(length letters to show) )
*/
function cutText() {
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function () {
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if (text.length > value && value > 0) {
            var newText = text.substring(0, value) + filler;
            $(this).text(newText);
        }
    });
};

/**
* Functional header butter
* @param {menuMobile} jquery obj - For what we click
* @param {toggleMenu} jquery obj - to what menu we will slideToggle
*/
function headeButer(menuMobile, toggleMenu) {
    if (menuMobile) {
        menuMobile.click(function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart', function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0) {
                    toggleMenu.slideUp();
                    menuMobile.removeClass('active');
                }
            }
        });
    }
}

/**
* Expresion for numbers with spaces
* @param {x} number
* @return {string}
*/
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

$(document).ready(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());

    goTo();
    animationBlock($('.setion-animate'));
});

$(window).resize(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());
});
'use strict';

function topSlider(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    fade: true
    // autoplay: true,
    // autoplaySpeed: 4000
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });
};

function worksSlider(selector) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    dots: true,
    arrows: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        vertical: false,
        verticalSwiping: false
      }
    }]
  });
};

function certSlider(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: false,
    responsive: [{
      breakpoint: 961,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 705,
      settings: {
        slidesToShow: 1
      }
    }]
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });

  $(selector).on('afterChange', function () {
    certArrowLock('.cert-slider .slide', prev, next);
  });
};

function certArrowLock(item, prev, next) {
  var index = parseInt($(item + '.slick-current.slick-active').attr('data-slick-index')) + 1;
  var length = $(item).length;
  var lastIndex = $('.cert-slider .slide').last();
  if (index == 1) {
    $(prev).addClass('lock');
  } else {
    $(prev).removeClass('lock');
  }
  if (lastIndex.hasClass('slick-active')) {
    $(next).addClass('lock');
  } else {
    $(next).removeClass('lock');
  }
}

function gallerySlider(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: false
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });

  $(selector).on('afterChange', function () {
    galleryArrowLock('.gallery-slider li', prev, next);
  });
};

function galleryArrowLock(item, prev, next) {
  var index = parseInt($(item + '.slick-current.slick-active').attr('data-slick-index')) + 1;
  var length = $(item).length;
  if (index == 1) {
    $(prev).addClass('lock');
  } else {
    $(prev).removeClass('lock');
  }
  if (index == length) {
    $(next).addClass('lock');
  } else {
    $(next).removeClass('lock');
  }
}

//Begin Google Map
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: mapCenterY, lng: mapCenterX },
    zoom: mapZoom,
    scrollwheel: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false
  });

  var marker = new google.maps.Marker({
    position: { lat: mapMarkerY, lng: mapMarkerX },
    map: map,
    icon: mapMarkerIcon
  });
}
//End Google Map

function heightItems() {
  var desc_height = 0;
  $('figure, .offer-list li').each(function () {
    var cur_desc = $(this).find('figcaption').innerHeight();
    if (cur_desc > desc_height) {
      desc_height = cur_desc;
    }
  });
  $('figure figcaption').css('height', desc_height);
}

//Burger Menu 1024
function burger() {
  var menu = $('.menu-wrap');
  $('.burger').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('open');

    if ($('.burger').hasClass('active')) {
      menu.slideUp('fast');
      $(this).removeClass('active');
    } else {
      menu.slideDown('fast');
      $(this).addClass('active');
    }
  });

  $(window).resize(function () {
    var menu = $('.menu-wrap');
    var w = $(window).width();
    if (w > 1024) {
      menu.removeAttr('style');
      $('.burger').removeClass('open');
      $('.burger').removeClass('active');
    }
  });
};

function checkDropdown() {
  $('.menu li').each(function () {
    if ($(this).find('ul').length > 0) {
      $(this).addClass('dropdown');
    }
  });
}

$(document).ready(function () {
  checkDropdown();
  topSlider('.top-slider', '.top-slider-prev', '.top-slider-next');
  worksSlider('.works-slider');
  certSlider('.cert-slider', '.cert-slider-prev', '.cert-slider-next');
  certArrowLock('.cert-slider .slide', '.cert-slider-prev', '.cert-slider-next');
  gallerySlider('.gallery-slider', '.gallery-slider-prev', '.gallery-slider-next');
  galleryArrowLock('.gallery-slider .slide', '.gallery-slider-prev', '.gallery-slider-next');
  heightItems();
  burger();
  $('.js-discount').fancybox();
  $('.js-call').fancybox();
  $('select').styler();
  if ($('.contacts').length) {
    initMap();
  }

  $('.button-catalog').click(function (e) {
    e.preventDefault();
    var caption = $(this).closest('li').find('figcaption').text().replace(/\s+/g, " ");
    $('#cost-popup input[name="material"]').val(caption);
    $.fancybox.open({
      src: "#cost-popup"
    });
  });

  $('.button-catalog, .offer-pic, figcaption').on('mouseover', function () {
    $(this).closest('li').addClass('active');
  }).on('mouseleave', function () {
    $(this).closest('li').removeClass('active');
  });

  //Menu Sliding Line
  var nav_wrap = $('.sliding-menu'),
      elem_width,
      elem_left_offset,
      elem_parent,
      slider_line;

  $(window).load(function () {
    nav_wrap.each(function () {
      $(this).append('<span class="sliding-line"></span>');

      var start_elem_width = 0;
      var start_elem_offset = 0;
      var active_elem = $(this).find(".active");

      if (active_elem.length) {
        start_elem_width = active_elem.outerWidth();
        start_elem_offset = active_elem.position().left;
      }

      $(this).find(".sliding-line").css({
        "width": start_elem_width + "px",
        "left": start_elem_offset + "px"
      }).data("width", start_elem_width).data("left", start_elem_offset);
    });
  });

  nav_wrap.find('li a').hover(function () {

    elem_parent = $(this).parent();
    elem_width = elem_parent.outerWidth();
    elem_left_offset = $(this).position().left;
    slider_line = elem_parent.siblings(".sliding-line");
    slider_line.stop().animate({
      "width": elem_width + "px",
      "left": elem_left_offset + "px"
    });
  }, function () {

    slider_line.stop().animate({
      "width": slider_line.data("width") + "px",
      "left": slider_line.data("left") + "px"
    });
  });

  //vacancies accordeon
  $('.vacancies-title-inner').click(function (e) {
    e.preventDefault();
    $('.vacancies-list').find('.content').slideUp();
    $('.vacancies-list').find('.vacancies-title a').removeClass('active');
    if ($(this).closest('li').find('.content').css('display') == 'none') {
      $(this).closest('li').find('.content').slideDown();
      $(this).find('a').addClass('active');
    } else {
      $(this).closest('li').find('.content').slideUp();
      $(this).find('a').removeClass('active');
    }
  });
});

$(window).load(function () {});

$(window).resize(function () {});