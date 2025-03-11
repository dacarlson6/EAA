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
        center: [-88.561, 43.9789], // Boeing Plaza
        zoom: 16 // Adjust zoom level here
    });

     // Add the Locate widget (Find My Location)
     const locateWidget = new Locate({
        view: view,  // Bind to the map view
        //useHeadingEnabled: false,  // Disable compass rotation
        //goToLocationEnabled: true  // Center map on user's location
    });

    // Add the widget to the UI in the top-left corner
    view.ui.add(locateWidget, "top-left");

});
