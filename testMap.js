

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


            // create getnextpage function
            function getNextPage(results, status, pagination) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    return;
                } else if (pagination.hasNextPage) {
                    var moreButton = document.getElementById('more');
                    moreButton.disabled = false;
                    moreButton.addEventListener('click', function () {
                        moreButton.disabled = true;
                        pagination.nextPage();
                    });
                } else {
                    document.getElementById('more').disabled = true;
                }
            }





            const moreButton = document.getElementById("more");

            moreButton.onclick = function () {
               moreButton.disabled = true;

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
                    const placesList = document.getElementById("places");
                    for (const place of results) {


                        const li = document.createElement("li");//create a list item

                        li.textContent = place.name;
                        placesList.appendChild(li);
                        var lat = place.geometry.location.lat();
                        var lng = place.geometry.location.lng();
                        //when the list item is clicked, the map will center on the location of the list item
                        li.addEventListener("click", function () {

                                map.setCenter(place.geometry.location);
                                map.setZoom(15);
                                //make an info window with the name of the place
                                var infowindow = new google.maps.InfoWindow({
                                    content:"you are here"
                                });
                                //open the info window
                                infowindow.open(map, place.geometry.location);








                            }

                        );
                    }



                    // Create a marker for each trail found, and add it to the map.
                    for (var i = 0; i < results.length; i++) {

                        const image = {
                                url: results[i].icon,
                                size: new google.maps.Size(71, 71),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(17, 34),
                                scaledSize: new google.maps.Size(25, 25),
                            };

                            const marker = new google.maps.Marker({
                                map,
                                icon: image,
                                title: results[i].name,
                                position: results[i].geometry.location


                            });
                            marker.setAnimation(google.maps.Animation.DROP);

                            const infowindow = new google.maps.InfoWindow({
                                content: results[i].name,

                            });
                        function mark() {
                            marker.addListener("click", () => {

                                //zoom in on the marker with a animation
                                marker.setAnimation(google.maps.Animation.BOUNCE);
                                setTimeout(() => {
                                    marker.setAnimation(null);
                                }, 1000);
                                map.setCenter(marker.getPosition());
                                //zoom in slowly on the marker
                                map.setZoom(15);
                                setTimeout(() => {
                                    map.setZoom(14);
                                }, 2000);

                                //automatically close the info window when the user clicks on the marker
                                infowindow.open(map, marker);
                                setTimeout(() => {
                                    infowindow.close();
                                    highLight(null);
                                }, 5000);
                                highLight(marker.title);


                            });
                        }
                        mark();




                        }
                    function highLight(name) {
                        placesList.querySelectorAll("li").forEach(function (li) {
                            if (li.textContent === name) {
                                //change the color of the list item to red
                                li.style.color = "red";
//
                            }else {
                                li.style.color = "black";
                            }
                        });
                    }


                    if (pagination && pagination.hasNextPage) {
                        getNextPage = () => {
                            // Note: nextPage will call the same handler function as the initial call
                            pagination.nextPage();
                        };
                    }

                    }


            });


        },);

    }








}

 //start the map
window.initMap= initMap;

//window.initMap = initMap;
