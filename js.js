jQuery(document).ready(function($){

"use strict";


//  Script for SEO, links, forward and backward buttons

var activemenu; // Declare activemenu variable globally

var load = function(url) {
  $.get(url).done(function(data) {
    // Load data into div
    $("#all").html(data);
    $(activemenu).addClass('active');
  });
};

$(document).on('click', 'a:not(.nofollow)', function(e) {
  e.preventDefault();
  $('li.active').removeClass('active');

  var $this = $(this);
  var url = $this.attr('href'); // Declare url and title using 'var'
  var title = $this.text();
  activemenu = 'li.' + url; // Assign to activemenu

  history.pushState({
    url: url,
    title: title
  }, title, url);

  document.title = title;
  load(url);
});

$(window).on("popstate", function(e) {
  var state = e.originalEvent.state;
  if (state !== null) {
    document.title = state.title;
    load(state.url);
  } else {
    document.title = "Care for Cape";
    $("#all").empty();
  }
});


  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 100
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
 
});
