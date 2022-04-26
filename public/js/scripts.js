$(document).ready(function() {
  var scrollLink = $(".scroll");

  // Smooth scrolling
  scrollLink.click(function(e) {
    e.preventDefault();
    $("body,html").animate(
      {
        scrollTop: $(this.hash).offset().top - 110
      },
      200
    );
  });
  $(window).load(function() {
    var x = location.protocol;
    if (x === "http:") {
      window.location.protocol = "https:";
    }
  });

  // Active link switching
  $(window).scroll(function() {
    var scrollbarLocation = $(this).scrollTop();
    scrollLink.each(function() {
      var sectionOffset = $(this.hash).offset().top + 20;
      if (sectionOffset <= scrollbarLocation) {
        $(this)
          .parent()
          .addClass("active");
        $(this)
          .parent()
          .siblings()
          .removeClass("active");
      }
    });
  });
});
function isOnScreen(elem) {
  // if the element doesn't exist, abort
  if (elem.length == 0) {
    return;
  }
  var $window = jQuery(window);
  var viewport_top = $window.scrollTop();
  var viewport_height = $window.height();
  var viewport_bottom = viewport_top + viewport_height;
  var $elem = jQuery(elem);
  var top = $elem.offset().top;
  var height = $elem.height();
  var bottom = top + height;

  return (
    (top >= viewport_top && top < viewport_bottom) ||
    (bottom > viewport_top && bottom <= viewport_bottom) ||
    (height > viewport_height &&
      top <= viewport_top &&
      bottom >= viewport_bottom)
  );
}

var oldsState = "header";
var newState = "";
jQuery(document).ready(function() {
  window.addEventListener("scroll", function(e) {
    if (isOnScreen(jQuery("#feed"))) {
      $(".content__text").css("display", "block");
    } else if (isOnScreen(jQuery("#save"))) {
      $(".content__text").css("display", "block");
    } else if (isOnScreen(jQuery("#scale"))) {
      $(".content__text").css("display", "block");
    } else if (isOnScreen(jQuery("#header"))) {
      $(".content__text").css("display", "block");
    } else {
      console.log("i am not here");
      $(".content__text").css("display", "none");
    }
  });
});

$(document).ready(function() {
  $("#name1").click(function(e) {
    $("#name1").addClass("showing1");
    for (let i = 2; i < 11; i++) {
      $("#name" + i).removeClass("showing" + i);
    }
  });
});
$(document).ready(function() {
  $("#name2").click(function(e) {
    $("#name2").addClass("showing2");
    for (let i = 1; i < 11; i++) {
      if (i == 2) {
        console.log("I am hit");
      } else {
        $("#name" + i).removeClass("showing" + i);
      }
    }
  });
});
$(document).ready(function() {
  $("#name3").click(function(e) {
    $("#name3").addClass("showing3");
    for (let i = 1; i < 11; i++) {
      if (i == 3) {
        console.log("I am hit");
      } else {
        $("#name" + i).removeClass("showing" + i);
      }
    }
  });
});
$(document).ready(function() {
  $("#name4").click(function(e) {
    $("#name4").addClass("showing4");
    for (let i = 1; i < 11; i++) {
      if (i == 4) {
        console.log("I am hit");
      } else {
        $("#name" + i).removeClass("showing" + i);
      }
    }
  });
});
$(document).ready(function() {
  $("#name5").click(function(e) {
    $("#name5").addClass("showing5");
    for (let i = 1; i < 11; i++) {
      if (i == 5) {
        console.log("I am hit");
      } else {
        $("#name" + i).removeClass("showing" + i);
      }
    }
  });
});
$(document).ready(function() {
  $("#name6").click(function(e) {
    $("#name6").addClass("showing6");
    for (let i = 1; i < 11; i++) {
      if (i == 6) {
        console.log("I am hit");
      } else {
        $("#name" + i).removeClass("showing" + i);
      }
    }
  });
});
$(document).ready(function() {
  $("#name7").click(function(e) {
    $("#name7").addClass("showing7");
    for (let i = 1; i < 11; i++) {
      if (i == 7) {
        console.log("I am hit");
      } else {
        $("#name" + i).removeClass("showing" + i);
      }
    }
  });
});
$(document).ready(function() {
  $("#name8").click(function(e) {
    $("#name8").addClass("showing8");
    for (let i = 1; i < 11; i++) {
      if (i == 8) {
        console.log("I am hit");
      } else {
        $("#name" + i).removeClass("showing" + i);
      }
    }
  });
});
$(document).ready(function() {
  $("#name9").click(function(e) {
    $("#name9").addClass("showing9");
    for (let i = 1; i < 11; i++) {
      if (i == 9) {
        console.log("I am hit");
      } else {
        $("#name" + i).removeClass("showing" + i);
      }
    }
  });
});
$(document).ready(function() {
  $("#name10").click(function(e) {
    $("#name10").addClass("showing10");
    for (let i = 1; i < 11; i++) {
      if (i == 10) {
        console.log("I am hit");
      } else {
        $("#name" + i).removeClass("showing" + i);
      }
    }
  });
});
$(function() {
  setTimeout(function() {
    if (location.hash) {
      /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
      window.scrollTo(0, 0);
      target = location.hash.split("#");
      smoothScrollTo($("#" + target[1]));
    }
  }, 1);

  // taken from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $("a[href*=#]:not([href=#])").click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      smoothScrollTo($(this.hash));
      return false;
    }
  });

  function smoothScrollTo(target) {
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

    if (target.length) {
      $("html,body").animate(
        {
          scrollTop: target.offset().top - 80
        },
        1000
      );
    }
  }
});
