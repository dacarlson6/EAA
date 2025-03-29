

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Search",
    "esri/layers/FeatureLayer"
], function(Map, MapView, Locate, BasemapToggle, Search, FeatureLayer) {

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
    
    // Add the Search widget
    const searchWidget = new Search({
        view: view
    });
    view.ui.add(searchWidget, "top-right");

    // Create and add the Camper Feedback button
    const feedbackButton = document.createElement("button");
    feedbackButton.id = "camperFeedbackButton";
    feedbackButton.innerText = "Camping Survey";
    feedbackButton.onclick = function() {
        window.open("https://arcg.is/uWPij1", "_blank"); // Open Survey123 form
    };
    

    // Add the button to the UI in the bottom-left corner
    view.ui.add(feedbackButton, "bottom-left");

    // Add AGOL Hosted Feature Layer that contains the EAA layers
    const attractionsLayer = new FeatureLayer({
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/0",
        title: "Attractions",
        outFields: ["*"],
        popupEnabled: true
      });
      
      const amenitiesLayer = new FeatureLayer({
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/1",
        title: "Amenities",
        outFields: ["*"],
        popupEnabled: true
      });
      
      const areasOfInterestLayer = new FeatureLayer({
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/2",
        title: "Areas of Interest",
        outFields: ["*"],
        popupEnabled: true
      });
      
      const exhibitHallsLayer = new FeatureLayer({
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/3",
        title: "Exhibit Halls",
        outFields: ["*"],
        popupEnabled: true
      });
      
      const parkingAreasLayer = new FeatureLayer({
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/4",
        title: "Parking Areas",
        outFields: ["*"],
        popupEnabled: true
      });
      
      const campingAreasLayer = new FeatureLayer({
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/5",
        title: "Camping Areas",
        outFields: ["*"],
        popupEnabled: true
      });
      
      // Add all layers to the map
      map.addMany([
        attractionsLayer,
        amenitiesLayer,
        areasOfInterestLayer,
        exhibitHallsLayer,
        parkingAreasLayer,
        campingAreasLayer
      ]);

});
