

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/widgets/BasemapToggle"
], function(Map, MapView, Locate, BasemapToggle) {

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
        goToLocationEnabled: true  // Automatically center when location is found
    });

    // Add the widget to the top-left corner of the UI
    view.ui.add(locateWidget, "top-left");

     // Add basemap toggle widget
     const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "hybrid" // The basemap it toggles to
    });
    view.ui.add(basemapToggle, "bottom-right");     

});
