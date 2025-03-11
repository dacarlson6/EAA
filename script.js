require([
    "esri/Map",
    "esri/views/MapView"
], function(Map, MapView) {

    // Create the map
    const map = new Map({
        basemap: "topo-vector"  // Change basemap here
    });

    // Create the map view
    const view = new MapView({
        container: "viewDiv", // this is where the map will be displayed
        map: map,
        center: [-88.576, 43.984], // Oshkosh, WI
        zoom: 13 // Adjust zoom level here
    });

});
