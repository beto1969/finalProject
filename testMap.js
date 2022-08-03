

function initMap() {
    // Create the map.
    var pos = {lat: 0, lng: 0};

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //const pyrmont = {lat: 33.88567264403002, lng: -84.61678725760989};
            const map = new google.maps.Map(
                document.getElementById("map"),
                {
                    center: pos,
                    zoom: 11,
                    mapId: "8d193001f940fde3",
                }
            );
            // Create the places service.
            var service = new google.maps.places.PlacesService(map);

            const moreButton = document.getElementById("more");

            //  let getNextPage:  () => false;//

            moreButton.onclick = function () {
                moreButton.disabled = true;
                let getNextPage = false;
                if (getNextPage) {
                    getNextPage();
                }
            };


            // Perform a nearby search.
            service.nearbySearch({
                location: pos,
                radius: 25000,
                keyword: "trail"
            }, function (results, status, pagination) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {

                    return;
                } else {

                    addPlaces(results,map);
                    // Create a marker for each hotel found, and add it to the map.
                    /*
                    for (var i = 0; i < results.length; i++) {



                        // info window to show the name of the marker

                        var infowindow = new google.maps.InfoWindow({
                            content: results[i].name,
                            position: results[i].geometry.location
                        });
                        // event display name of place when clicked on marker
                        marker.addListener('click', function () {
                            infowindow.open(map, marker);
                        });


                    }
                    //display name of place when clicked on marker
*/

                }


            });


        },);

    }


}

    function addPlaces(
        //take in new places from nearbySearch
        results,
        map

    ) {
        for (const place of places) {
            var placesList = document.getElementById("places");//


            let image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            var marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                icon: image
            });
            //show the marker on the map
            window.marker = marker;


            // Create a marker for each place.



            const li = document.createElement("li");//create a list item

            li.textContent = place.name;
            placesList.appendChild(li);

            li.addEventListener("click", () => {//add a click event listener to the list item
                //set the map's center to the current place
                map.setCenter(place.geometry.location);

            });
        }

}
 //start the map
window.initMap= initMap;

//window.initMap = initMap;
