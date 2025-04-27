var browser_width,
  browser_height,
  menu_clicked = false,
  touch_enabled = false,
  extra_padding = 0,
  column_width = 256,
  map,
  header_height,
  latlng;

iOS_position_fixed = function () {};

$(window).scroll(function () {
  if (!menu_clicked) {
    var scroll_top = $(window).scrollTop();

    $("#content")
      .children("h1,section")
      .each(function () {
        if (
          $(this).offset().top - extra_padding - 128 <= scroll_top &&
          $(this).next().offset().top - extra_padding - 128 > scroll_top
        ) {
          var hash = $(this).attr("id").replace("-container", "");

          $("header .selected").removeClass("selected");
          $("header a[href='/#" + hash + "']")
            .parent("li")
            .addClass("selected");

          location.hash = hash;
        }
      });
  }

  positionHorizontalMenu();

  iOS_position_fixed();
});

positionHorizontalMenu = function () {
  if (browser_width < 1024) {
    if ($(window).scrollTop() < $(".home a").innerHeight() + 1)
      $("header").css("margin-top", -$(window).scrollTop() + "px");
    else $("header").css("margin-top", -$(".home a").innerHeight() - 1 + "px");
  } else {
    $("header").css("margin-top", 0);
  }
};

$(window).load(function () {
  var hash = window.location.hash;

  if (hash && $(hash + "-container").length > 0) {
    $("html,body").animate({ scrollTop: $(hash + "-container").offset().top - extra_padding }, 500);
    iOS_position_fixed();
  }

  if (browser_width < 1024) {
    $("#content").css("padding-top", $("header").height() + "px");
  }
});

resize_magic = function () {
  browser_width = $(window).width();
  browser_height = $(window).height();
  header_height = $("header").height();

  if (map) {
    set_map_center();
  }

  positionHorizontalMenu();

  if (browser_width < 1024) {
    $("html").addClass("top_menu");
    //$("header").css("margin-top", 0);
    extra_padding = $("header").height() - ($(".home a").innerHeight() + 1);
    $("#content").css("padding-top", $("header").height() + "px");

    if (browser_width < 768) {
      $(".sections").css("width", browser_width + "px");

      if ($(".masonry").length) {
        $(".expanded").removeClass("expanded visible");
        $("#we-work-for-container").masonry("destroy");
      }

      if (browser_width < 480) {
        $("#we-work-for-container article, .box, .box img")
          .css("width", browser_width / 2 + "px")
          .css("height", browser_width / 2 + "px");
        $("#edw-news-container article")
          .css("padding", "")
          .css("min-height", "")
          .css("width", browser_width - 40 + "px");
      } else {
        $("#we-work-for-container article, .box, .box img")
          .css("width", browser_width / 3 + "px")
          .css("height", browser_width / 3 + "px");
        $("#edw-news-container article")
          .css("padding", "0 " + (browser_width / 3 + 20) + "px 0 20px")
          .css("width", browser_width - (browser_width / 3 + 40) + "px")
          .css("min-height", browser_width / 3 + "px");
      }
    } else {
      $(".sections, .with_padding h2, #edw-news-container article").removeAttr("style");
      if (
        $("body.home #we-work-for-container").length &&
        $("body.home #we-work-for-container").hasClass("masonry") == false
      ) {
        $("#we-work-for-container").masonry({
          itemSelector: "article, h2",
          columnWidth: column_width,
          isAnimated: !Modernizr.csstransitions,
        });
      }

      $("#we-work-for-container article, .box, .box img").removeAttr("style");
    }
  } else {
    $(".sections, .with_padding h2, #edw-news-container article").removeAttr("style");
    if (
      $("body.home #we-work-for-container").length &&
      $("body.home #we-work-for-container").hasClass("masonry") == false
    ) {
      $("#we-work-for-container").masonry({
        itemSelector: "article, h2",
        columnWidth: column_width,
        isAnimated: !Modernizr.csstransitions,
      });
    }

    $("#we-work-for-container article, .box, .box img").removeAttr("style");

    $("html").removeClass("top_menu");
    extra_padding = 0;
    $("#content").css("padding-top", 0);

    if (browser_height < header_height) $(".home a").addClass("lessPadding");
    else $(".home a").removeClass("lessPadding");
  }

  if ($(".masonry").length) {
    $("#we-work-for-container").masonry("option", { isAnimated: false });
    $("#we-work-for-container").masonry("reload");
  }

  // resize embeds' height
  /*$("iframe, object, embed, video").each(function(){
        $(this).css("height", $(this).css("width").replace("px","") * $(this).attr("height") / $(this).attr("width") + "px");
    });*/
};

function set_map_center() {
  map.setCenter(latlng);
  map.setZoom(15);
}

// Ready to go

$(document).ready(function () {
  if (navigator.userAgent.match("iPad") || navigator.userAgent.match("iPod")) {
    $("html").addClass("iOS");
  }

  if (navigator.userAgent.match("OS 5")) {
    $("html").addClass("iOS5");
  }

  header_height = $("header").height();

  if ($("html").hasClass("touch")) {
    touch_enabled = true;
  }

  if (!touch_enabled) {
    $(window).resize(function () {
      resize_magic();
    });
  } else {
    $("html.touch body").bind("orientationchange", function (event) {
      resize_magic();
    });
  }

  resize_magic();

  if ($("body").hasClass("home")) {
    $("#index-container p:nth-of-type(1)").addClass("first");

    if (browser_width >= 768) {
      $("#we-work-for-container").masonry({
        itemSelector: "article, h2",
        columnWidth: column_width,
        isAnimated: !Modernizr.csstransitions,
      });

      $(".masonry .box").live("click", function (e) {
        $(".expanded").removeClass("expanded visible");
        var current_article = $(this).parent();

        current_article.addClass("expanded");

        $("#we-work-for-container").masonry("option", { isAnimated: true });
        $("#we-work-for-container").masonry("reload");

        waitForAnimation = setTimeout(function () {
          current_article.addClass("visible");
          clearTimeout(waitForAnimation);
        }, 600);

        e.preventDefault();
      });
    }

    $("header a, .sections").each(function () {
      $(this).click(function (e) {
        var hash = $(this).attr("href").substr(1);
        $("html,body").animate({ scrollTop: $(hash + "-container").offset().top - extra_padding }, 500);

        menu_clicked = true;

        $("header .selected").removeClass("selected");
        $("header a[href='/" + hash + "']")
          .parent("li")
          .addClass("selected");

        waitForAnimation = setTimeout(function () {
          menu_clicked = false;
          clearTimeout(waitForAnimation);
        }, 500);

        location.hash = hash;

        iOS_position_fixed();

        e.preventDefault();
      });
    });
  }

  $("#top").click(function (e) {
    $("html,body").animate({ scrollTop: 0 }, 500);
    e.preventDefault();
  });

  $("a[rel=external]").each(function () {
    $(this).attr("target", "_blank");
  });
});
