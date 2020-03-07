//-- function for when the educational button is clicked --//
$(".educational").on('click', function(){
  alert("education");
});
//-- function for when the recreational button is clicked --//
$(".recreational").on('click', function(){
  alert("recreational");
});
//-- function for when the social button is clicked --//
$(".social").on('click', function(){
  alert("social");
});
//--  function for when the DIY button is clicked--//
$(".diy").on('click', function(){
  alert("diy");
});
//-- function for when the charity button is clicked --//
$(".charity").on('click', function(){
  alert("charity");
});
//-- funtion for when the cooking button is clicked --//
$(".cooking").on('click', function(){
  alert("cooking");
});
//--  function for when the relaxation button is clicked --//
$(".relaxation").on('click', function(){
  alert("relaxarion");
});
//-- function for the musical is clicked --//
$(".musical").on('click', function(){
  alert("musical");
});
//-- function for the busywork is clicked --//
$(".busywork").on('click', function(){
  alert("busywork");
});
//-- function for the input box --//


function callBored(){
    var queryURL = "http://www.boredapi.com/api/activity/";

$.ajax({
    url: queryURL,
    method: "GET"
})
    
.then(function(response) {
    console.log(response);
});
}

// ---------------------------------------Google Maps----------------------------------
var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '500',
    query: 'restaurant'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
      });
      var infowindow = new google.maps.InfoWindow({
          title: place.name,
          content: '<div id="content">'+
          '<h1>'+ place.name +'</h1>' +
          '<h3>'+ place.formatted_address +'</h3>' +
          '</div>',
          maxWidth: 200,
      })
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

    //   createMarker(results[i]);
      
    }
  }
}
// ---------------------------------------Google Maps----------------------------------
callBored();
initialize();