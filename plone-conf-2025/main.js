$(document).ready(function () {
  // ******************************************
  // homepage animation // previous homepage.js
  if ($(window).width() > 768) {
    backgroundOffset = -48;
    furthestOffset = -36;
    furtherOffset = -24;
    farOffset = -12;
  } else {
    backgroundOffset = -24;
    furthestOffset = -18;
    furtherOffset = -12;
    farOffset = -6;
  }
  // init controller
  controller = new ScrollMagic();

  var tween_cityscape = new TimelineMax().add(
    [
      TweenMax.fromTo(
        "#background",
        0.5,
        { top: backgroundOffset },
        { top: 0 }
      ),
      TweenMax.fromTo("#furthest", 0.5, { top: furthestOffset }, { top: 0 }),
      TweenMax.fromTo("#further", 0.5, { top: furtherOffset }, { top: 0 }),
      TweenMax.fromTo("#far", 0.5, { top: farOffset }, { top: 0 }),
    ],
    "+=0",
    "start"
  );

  // build scene
  var scene_cityscape = new ScrollScene({
    triggerElement: "#scene-cityscape",
    triggerHook: 0,
    duration: 96,
  })
    .setTween(tween_cityscape)
    .addTo(controller);
});
