$(function () {
  'use strict';

  //VARIABLES
  var tabFinish = 0,
    enableScroll = 0,
    swipers = [],
    winW,
    winH,
    xsPoint = 767,
    smPoint = 991,
    mdPoint = 1199,
    initIterator = 0,
    is_visible = $('.menu-button').is(':visible');
  winW = $(window).width();
  winH = $(window).height();

  //WINDOW LOAD
  $(window).load(function () {
    $('body').addClass('loaded');
    $('#loader-wrapper').fadeOut();
    filterHeight();
    window.scrollTo(0, 0);

    if (window.location.hash) {
      var index = $(
        '.scroll-to-link[href="' + window.location.hash + '"]'
      ).index('.scroll-to-link');
      $('body, html').animate(
        { scrollTop: $('.scroll-to-block').eq(index).offset().top },
        10,
        function () {
          enableScroll = 1;
        }
      );
    } else enableScroll = 1;
  });

  //SCROLL FUNCTIONS
  $(window).scroll(function () {
    scrollCall();
    if ($('.time-line').length) {
      $('.time-line')
        .not('.animated')
        .each(function () {
          if (
            $(window).scrollTop() + $(window).height() >
            $(this).offset().top
          ) {
            $(this).addClass('animated').find('.timer').countTo();
            $('.skill').each(function () {
              var toHeight = $(this).find('h3').data('to');
              $(this)
                .find('.timer-wrapper')
                .height(toHeight + '%');
            });
            $('.our-progress').each(function () {
              var toW = $(this).find('.timer').data('to');
              $(this)
                .find('.line-active')
                .width(toW + '%');
            });
          }
        });
    }

    if (!is_visible) {
      template8placeHeader();
    }
  });

  //SCROLL MENU
  function scrollCall() {
    var winScroll = $(window).scrollTop();
    if ($('.scroll-to-block').length && enableScroll) {
      $('.scroll-to-block').each(function (index, element) {
        if (
          $(element).offset().top <= winScroll + 2 &&
          $(element).offset().top + $(element).height() > winScroll
        ) {
          $('.scroll-to-link').parent().removeClass('active');
          $('.scroll-to-link').eq(index).parent().addClass('active');
          if (
            window.location.hash != $('.scroll-to-link').eq(index).attr('href')
          )
            window.location.hash = $('.scroll-to-link').eq(index).attr('href');
        }
      });
    }
  }

  $('.scroll-to-link').on('click', function () {
    var index = $(this).parent().parent().find('.scroll-to-link').index(this);

    $('body, html').animate(
      { scrollTop: $('.scroll-to-block').eq(index).offset().top },
      800
    );
    return false;
  });

  $('.process').on('click', function () {
    var $t = $(this);
    if (tabFinish || $t.hasClass('active')) return false;
    tabFinish = 1;
    $t.closest('.work-process').find('.process').removeClass('active-process');
    $t.addClass('active-process');
    var index = $t.parent().parent().find('.process').index(this);
    $t.closest('.work-process')
      .find('.process-info:visible')
      .fadeOut(500, function () {
        $t.closest('.work-process')
          .find('.process-info')
          .eq(index)
          .fadeIn(500, function () {
            tabFinish = 0;
          });
      });
  });

  // BACKGROUND IMG
  $('.center-image').each(function () {
    var bgSrc = $(this).attr('src');
    $(this)
      .parent()
      .css({ 'background-image': 'url(' + bgSrc + ')' });
    $(this).remove();
  });

  //RIGHT FIXED MENU
  function template8placeHeader() {
    if ($('.nav').hasClass('s-nav')) {
      var menuH = $('.header .container').outerHeight();
      if (menuH > winH) {
        $('.s-header').removeClass('fixed-top');
        if ($(window).scrollTop() + winH >= menuH) {
          $('.s-header').addClass('fixed-bottom');
        } else {
          $('.s-header').removeClass('fixed-bottom');
        }
      } else $('.s-header').removeClass('fixed-bottom').addClass('fixed-top');
    }
  }

  if (!is_visible) {
    template8placeHeader();
  }

  if (is_visible) {
    $('.s-header').addClass('fixed');
  }

  //HEADER FIXED ON SCROLL
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 10) {
      $('.b-header').addClass('b-header-active');
      $('.a-header').addClass('a-header-active');
      $('.r-header').addClass('r-header-active');
      $('.m-header ').addClass('m-header-bg');
      $('.tori-nav ').addClass('tori-nav-active');
      $('.aitori-logo').addClass('aitori-logo-active');
    } else {
      $('.b-header').removeClass('b-header-active');
      $('.a-header').removeClass('a-header-active');
      $('.m-header ').removeClass('m-header-bg');
      $('.tori-nav ').removeClass('tori-nav-active');
      $('.aitori-logo').removeClass('aitori-logo-active');
    }
  });

  //MENU RESPONSIVE SHOW
  $('.menu-button').on('click', function () {
    var menu = $('.nav').slideToggle(400);
    $(this).toggleClass('active');

    $(window).resize(function () {
      var w = $(window).width();
      if (w > 320 && menu.is(':hidden')) {
        menu.removeAttr('style');
      }
    });
  });

  //MENU RESPONSIVE SHOW TYPE2
  $('.m-menu-button').on('click', function () {
    $(this).toggleClass('active');
    $('.m-header').toggleClass('m-header-active');
    $('.m-nav').toggleClass('m-nav-active');
  });

  if (is_visible) {
    $('.nav a').on('click', function () {
      $('.nav').slideUp(300);
      $('.menu-button').removeClass('active');
    });
  }

  $('.m-nav a').on('click', function () {
    if (winW < 992) {
      $('.m-nav').removeClass('m-nav-active');
    }
  });

  //CALCULATE HEIGHT FILTER BLOCK
  function filterHeight() {
    var imgH = $('.corner-stamp').next('.work-img').find('img').height();
    $('.corner-stamp').height(imgH - 30);
  }
  filterHeight();

  //ARROW DOWN
  $('.arrow-down').on('click', function (e) {
    $('html,body')
      .stop()
      .animate({ scrollTop: $('.demo-info').offset().top }, 800);
    e.preventDefault();
  });

  $('.to-gallery').on('click', function (e) {
    $('html,body')
      .stop()
      .animate({ scrollTop: $('.gallery-food').offset().top }, 800);
    e.preventDefault();
  });
});
