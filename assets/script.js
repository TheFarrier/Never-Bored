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