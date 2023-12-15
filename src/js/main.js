/*
 * MIGOTHEMES Template Personal Portfolio
 * Created by: MIGOTHEMES
 * Version: 1
 */

/* INDEX OF CONTENTS JAVASCRIPT
==================================================
  01. Owl carousel
  02. ByteMuse Scroll it
  03. Scroll to top
  04. Progress bar
  05. Header change
  06. Menu toggle
  08. Magnific popup
==================================================
*/

(function ($) {
  "use strict";

  $(document).ready(function () {
    owl_sliders();
    scroll_it();
    scroll_to_top();
    progress_bar();
    header_change();
    menu_toggle();
    popup_gallery();
  });

  $(window).on("scroll", function () {
    header_change();
    progress_bar();
  });

  // $(window).on("load", function () {
  //   $("#preloader").delay(1000).fadeOut("slow");
  // });

  // -----------------------
  // Owl carousel
  // -----------------------

  function owl_sliders() {
    var logoSlider = $("#logo-slider");

    if (logoSlider.length > 0) {
      logoSlider.each(function () {
        var t = $(this);
        $(this).owlCarousel({
          loop: t.data("loop"),
          items: t.data("items"),
          autoplay: t.data("autoplay"),
          autoplaySpeed: t.data("autoplay-speed"),
          smartSpeed: t.data("smart-speed"),
          margin: t.data("margin"),
          dots: t.data("dots"),
          arrows: t.data("arrows"),
          autoplayHoverPause: t.data("hoverpause"),
          autoplayTimeout: t.data("autoplay-timeout"),
          responsive: {
            0: { items: 2 },
            640: { items: 3 },
            1024: { items: 5 },
          },
        });
      });
    }

    var testimonialSlider = $("#testimonial-slider");

    if (testimonialSlider.length > 0) {
      testimonialSlider.each(function () {
        var t = $(this);
        $(this).owlCarousel({
          loop: t.data("loop"),
          autoplay: t.data("autoplay"),
          autoplayTimeout: t.data("autoplay-timeout"),
          items: t.data("items"),
          autoplaySpeed: t.data("autoplay-speed"),
          smartSpeed: t.data("smart-speed"),
          dots: t.data("dots"),
          arrows: t.data("arrows"),
          autoplayHoverPause: t.data("autoplay-hoverpause"),
          margin: t.data("margin"),
          responsive: {
            0: { items: 1 },
            640: { items: 2 },
            1024: { items: 3 },
          },
        });

        var nextButton = $(".testimonial-buttons .next-button");
        var prevButton = $(".testimonial-buttons .prev-button"); 

        nextButton.on("click", function () {
            t.trigger("next.owl.carousel");
          return false;
        });

        prevButton.on("click", function () {
            t.trigger("prev.owl.carousel");
          return false;
        });
      });
    }
  }

  // -----------------------
  // Scroll to top
  // -----------------------

  function scroll_to_top() {
    var scrollToTopButton = $(".scroll-to-top");

    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 500) {
        scrollToTopButton.fadeIn();
      } else {
        scrollToTopButton.fadeOut();
      }
    });
  }

  // -----------------------
  // ByteMuse Scroll it
  // -----------------------

  function scroll_it() {
    var scrollIt = $("#scroll-it");
    if (scrollIt.length > 0) {
      scrollIt.each(function () {
        $.scrollIt({
          upKey: 38, // key code to navigate to the next section
          downKey: 40, // key code to navigate to the previous section
          easing: "linear", // the easing function for animation
          scrollTime: 600, // how long (in ms) the animation takes
          activeClass: "active", // class given to the active nav element
          onPageChange: null, // function(pageIndex) that is called when page is changed
          topOffset: -50, // offste (in px) for fixed top navigation
        });
      });
    }
  }

  // -----------------------
  // Header
  // -----------------------

  function header_change() {
    var header = $(".primary-header");

    if ($(window).scrollTop() >= 80) {
      header.addClass("header-onscroll");
    } else {
      header.removeClass("header-onscroll");
    }
  }

  // -----------------------
  // Progress bar
  // -----------------------

  function progress_bar() {
    $(".progress-bar .progress-inner").each(function () {
      var bar = $(this);
      var barWidth = bar.data("value") + "%";
      var scrolltop = $(window).scrollTop();
      var height = $(window).height();
  
      if (bar.offset().top + bar.outerHeight() < scrolltop + height) {
        bar.css({ width: barWidth });
      }
    });
  }
  
  // -----------------------
  // Menu toggle
  // -----------------------

  function menu_toggle() {
    var burger = $(".burger-menu");
    var primaryHeader = $(".primary-header");
    burger.on("click", function () {
      primaryHeader.toggleClass("open-menu");
    });

    $(".navbar-collapse .navbar a").on("click", function () {
      var isBurgerVisible = $('.burger-menu').is(':visible');
      if (isBurgerVisible) {
        primaryHeader.removeClass("open-menu"); 
      }
    });
  }

  // -----------------------
  // Magnific popup
  // -----------------------

  function popup_gallery() {
    var popupGallery = $(".popup-gallery");
    if (popupGallery.length > 0) {
      popupGallery.each(function () {
        $(this).magnificPopup({
          delegate: ".popup-link",
          type: "image",
          closeBtnInside: true,
          fixedContentPos: true,
          mainClass: "mfp-fade",
          gallery: {
            enabled: true,
            preload: [0, 2],
            closeOnBgClick: true,
            navigateByImgClick: true,
          },
        });
      });
    }
  }

  $(function () {
    // Here is the form
    var form = $("#contact");

    // Getting the messages div
    var formMessages = $(".form-message p");

    // Setting up an event listener for the contact form
    $(form).submit(function (event) {
      // Stopping the browser to submit the form
      event.preventDefault();

      // Serializing the form data
      var formData = $(form).serialize();

      // Submitting the form using AJAX
      $.ajax({
        type: "POST",
        url: $(form).attr("action"),
        data: formData,
      })
        .done(function (response) {
          // Making the formMessages div to have the 'success' class
          $(formMessages).removeClass("error");
          $(formMessages).addClass("success");

          // Setting the message text
          $(formMessages).text(response);

          // Clearing the form after successful submission
          $("#inputName").val("");
          $("#inputEmail").val("");
          $("#inputPhone").val("");
          $("#inputMessage").val("");
        })
        .fail(function (data) {
          // Making the formMessages div to have the 'error' class
          $(formMessages).removeClass("success");
          $(formMessages).addClass("error");

          // Setting the message text
          if (data.responseText !== "") {
            $(formMessages).text(data.responseText);
          } else {
            $(formMessages).text(
              "Oops! An error occured and your message could not be sent."
            );
          }
        });
    });
  });
   
})(jQuery);
