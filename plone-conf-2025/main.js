var map;
var geocoder;

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '?key=AIzaSyCgzwlVgB2yRIIW89qbpi9dAiWlD1DAjy0' +
      '&callback=initialize';
  document.body.appendChild(script);
}
function initialize() {
  var mapContainer = $('#map-canvas');
  if(!mapContainer.length){
    return;
  }
  var address = mapContainer.data('address');

  map = new google.maps.Map(mapContainer[0], {
    zoom: 17,
    scrollwheel: false,
    center: codeAddress(address),
    styles: [
      {
        "featureType":"water",
        "elementType":"geometry",
        "stylers": [{
          "color":"#75B6CA"}]
      },
      {
        "featureType":"landscape",
        "elementType":"geometry",
        "stylers": [{
          "color":"#38133f"}]
      },
      {
        "featureType":"poi",
        "stylers": [{
          "visibility": "off"}]
      },
      {
        "featureType":"road.highway",
        "elementType":"geometry",
        "stylers": [{
          "color":"#FFC06E"}]
      },
      {
        "featureType":"road.arterial",
        "elementType":"geometry",
        "stylers": [{
          "color":"#f76a52"}]
      },
      {
        "featureType":"road.local",
        "elementType":"geometry",
        "stylers": [{
          "color":"#4F3D59"}]

      },
      {
        "elementType":"labels.text.fill",
        "stylers": [{
          "color":"#ffffff"}]
      },
      {
        "elementType":"labels.text.stroke",
        "stylers": [{
          "color":"#3F2045",
          "opacity": ".2" }]
      },
      {
        "featureType":"transit",
        "elementType":"geometry",
        "stylers": [{
          "visibility":"off"}]
      },
      {
        "featureType":"administrative",
        "elementType":"geometry",
        "stylers": [{
          "color":"#333739"}]
      },
      {
        "featureType":"poi.park",
        "stylers": [{
          "color":"#2ecc71"}]
      },
      {
        "featureType":"road",
        "elementType":"geometry.stroke",
        "stylers": [{
          "visibility": "off"}]
      }]
  });
}
function codeAddress(address) {
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          icon: '/++theme++ploneconf2015.theme//img/map-marker.png',
          position: results[0].geometry.location,
          title: 'Intercontinental'
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

$(document).ready(function() {
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

  var tween_cityscape = new TimelineMax()
      .add([TweenMax.fromTo("#background", 0.5,
              { top: backgroundOffset },
              { top: 0 }),
            TweenMax.fromTo("#furthest", 0.5,
              { top: furthestOffset },
              { top: 0 }),
            TweenMax.fromTo("#further", 0.5,
              { top: furtherOffset },
              { top: 0 }),
            TweenMax.fromTo("#far", 0.5,
              { top: farOffset },
              { top: 0 })
           ], "+=0", "start");

  // build scene
  var scene_cityscape = new ScrollScene({
            triggerElement: "#scene-cityscape", 
            triggerHook: 0,
            duration: 96
          })
          .setTween(tween_cityscape)
          .addTo(controller);

  var scene_location = new ScrollScene({
            triggerElement: "#location-photos",
            offset: 100
          })
          .setClassToggle('#location-photos', 'active')
          .addTo(controller)

  // show indicators (requires debug extension)
  // scene_cityscape.addIndicators();
  // scene_location.addIndicators();

  // make indicators visible
  // $('.ScrollSceneIndicators').css('z-index', 5000);


  // ******************************************
  // scroll to content // previous secondary.js
  if ($('.section-front-page').length) {
    return;
  }
  var hash = window.location.hash;
  if(!hash && !$(window).scrollTop()){
    hash = '#navbar';
    var el = $('body').find(hash);
    window.setTimeout(function() {
      $('html, body').animate({
          scrollTop: el.offset().top
      }, 500);
    }, 300);
  }

  // ***********************************************
  // Initialize map on venue page // previous map.js
  loadScript();

  //hover on input boxes
  $(".input-box").hover(function(){
    $(this).toggleClass("is_focused");
  });  
});
