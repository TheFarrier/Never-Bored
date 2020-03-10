
$("#mainForm").on("submit",function(event){
event.preventDefault();
var activities= $('input[name="activity"]:checked').val();
var zipcode= $("#zip-code").val();
var buddySlide=$("#buddySlide").val();
var moneySlide=$("#moneySlide").val();
console.log(activities);
console.log(zipcode);
console.log(buddySlide);
console.log(moneySlide);

});



//-- function for the input box --//

var boredResponse;

function callBored(){
    var queryURL = "http://www.boredapi.com/api/activity/";

$.ajax({
    url: queryURL,
    method: "GET"
})
    
.then(function(response) {
    console.log(response);
    boredResponse = response;
});
}

// ---------------------------------------Google Maps----------------------------------//

var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

if(sPage == "results.html"){
   
  var map;
  var service;
  var infowindow;
  var address = '78253';
  var local;
  
  function initialize() {
    var geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({'address': address}, function(results){
      console.log(results);
      local = results[0].geometry.location
      console.log(local);
  
      map = new google.maps.Map(document.getElementById('map'), {
        center: local,
        zoom: 11,
      });
  
    var request = {
      location: local,
      radius: '500',
      query: boredResponse.activity,
    };
  
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  
    });
  
    
  }
  
  var failcount = 0;
  
  function callback(results, status) {
    
    if (status == google.maps.places.PlacesServiceStatus.OK && results != null && failcount <= 1) {
      for (var i = 0; i < results.length && i< 10; i++) {
        var place = results[i];
        console.log(place);
        var marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name,
        });
        var infowindow = new google.maps.InfoWindow({
            title: place.name,
            maxWidth: 200,
        })
      
        var content = '<div id="content">'+
        '<h1>'+ place.name +'</h1>' +
        '<h3>'+ place.formatted_address +'</h3>' +
        '</div>';
  
        google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
          return function() {
              infowindow.setContent(content);
              infowindow.open(map,marker);
          };
          })(marker,content,infowindow)); 
        
      }
    } else if (failcount === 0){
      failcount = 1;
      request = {
        location: local,
        radius: '500',
        query: boredResponse.type,
      };
      service.textSearch(request, callback);
    } else {
      alert("No locations found")
    };
  
  }
  // ---------------------------------------Google Maps----------------------------------
  callBored();
  initialize();

};
