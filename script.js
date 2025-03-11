

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate"
], function(Map, MapView, Locate) {

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
        useHeadingEnabled: false,  // Disable compass rotation
        goToLocationEnabled: true  // Automatically center when location is found
    });

    // Add the widget to the top-left corner of the UI
    view.ui.add(locateWidget, "top-left");

     // Add basemap toggle
     const basemapToggle = document.getElementById("basemapToggle");
     let isTopo = true;  // Track the current basemap
 
     basemapToggle.addEventListener("click", function() {
         if (isTopo) {
             map.basemap = "imagery-hybrid";  // Switch to imagery
             basemapToggle.style.backgroundImage = "url('https://www.arcgis.com/sharing/rest/content/items/8d91bd39e873417ea21673e0fee87604/info/thumbnail/topographic.jpg')"; // Topo preview
         } else {
             map.basemap = "topo-vector";  // Switch back to topo
             basemapToggle.style.backgroundImage = "url('https://www.arcgis.com/sharing/rest/content/items/ea04811f7d744bba94bbf251f61eaf88/info/thumbnail/imagery_hybrid.jpg')"; // Imagery preview
         }
         isTopo = !isTopo;  // Toggle state
     });

});
