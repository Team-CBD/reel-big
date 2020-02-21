  var map, infoWindow;
      map = new google.maps.Map(document.getElementById("googleMap"), {
        center: {
          lat: "",
          lng: ""
        },
        zoom: 12
      });
      infoWindow = new google.maps.InfoWindow;
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
              map.setCenter(pos);
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
  
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
  
   // Handle Submit Function for creating Google Maps Markers on current location
      function fishDataSubmit() {
        
  
        navigator.geolocation.getCurrentPosition(function (position) {
          // get CURRENT location
          var currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
  
          // Get information for the form and add a popup tip window
          // Use jquery to grab the form element and get the data
          var fishType = $("#fishType").val();
          var baitType = $("#baitType").val();
  
        // icon link 
         var image = "http://maps.google.com/mapfiles/kml/shapes/fishing.png";

          // create a new google Maps marker
          var newMarker = new google.maps.Marker({
            position: currentPosition,
            map: map,
            icon: image,
          }).addListener('click', function () {
            map.setCenter(this.getPosition())
            infoWindow.setPosition(this.getPosition());
            infoWindow.setContent(`{USER_HERE} has caught: ${fishType} using bait: ${baitType}!`);
            infoWindow.open(map, this);
          })
          console.log(position);
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          // add our new marker to the marker array
          
          //post catch in db
          $("#fishLocationSubmitButton").on("fishDataSubmit", function(event){
            event.preventDefault();
            console.log("New catch testing");
        
            var newCatch = {
              fish_type: $("#fishType").val().trim(),
              bait_type: $("baitType").val().trim(),
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
        
            //Send the POST for newCatch to db 
            $.ajax("/api/catch", {
              type: "POST",
              data: newCatch
            }).then({
              function() {
                console.log("Created New Catch!");
                location.reload();
              }
            })
          });
        
       
          //fishingMarkers.push(newMarker);
        })
  
      }
  

              //Store our markers
              // var fishingMarkers = [
              //   new google.maps.Marker({
              //     position: {
              //       lat: 33.856926,
              //       lng: -117.17437
              //     },
              //     map: map,
              //     icon: image,
              //   }).addListener('click', function () {
              //     map.setCenter(this.getPosition())
              //     infoWindow.setPosition(this.getPosition());
              //     infoWindow.setContent(`{USER_HERE} has caught: ${fishType} using bait: ${baitType}!`);
              //     infoWindow.open(map, this);
              //   }),
              //   new google.maps.Marker({
              //     position: {
              //       lat: 33.856926,
              //       lng: -117.15437
              //     },
              //     map: map,
              //     icon: image,
              //   }).addListener('click', function () {
              //     map.setCenter(this.getPosition())
              //     infoWindow.setPosition(this.getPosition());
              //     infoWindow.setContent(`{USER_HERE} has caught: ${fishType} using bait: ${baitType}!`);
              //     infoWindow.open(map, this);
              //   })
          
              // ]
               
              //     fishingMarkers.push(newMarker);
              //   })
                
          
              // }

