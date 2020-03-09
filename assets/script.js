//sound effects for when an activity buttons is selected
var selectedBtn = $(".btn-large");
//event listener for button click

console.log(document.parentElement);

selectedBtn.click(function btnSelected () {
  $("audio#click")[0].play()
  $(this).removeClass("waves-light")
  $(this).addClass("lime lighten-1")
 })
 
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
