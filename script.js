document.addEventListener("DOMContentLoaded", function () {
  require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Search",
    "esri/layers/FeatureLayer",
    "esri/rest/locator"
  ], function (Map, MapView, Locate, BasemapToggle, Search, FeatureLayer, locator) {

    // Create the map
    const map = new Map({
      basemap: "topo-vector"
    });

    // Create the map view
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-88.561, 43.9789], // Boeing Plaza
      zoom: 16
    });

    // Locate widget
    const locateWidget = new Locate({
      view: view,
      goToLocationEnabled: true
    });
    view.ui.add(locateWidget, "top-left");

    // Basemap toggle widget
    const basemapToggle = new BasemapToggle({
      view: view,
      nextBasemap: "hybrid"
    });
    view.ui.add(basemapToggle, "bottom-right");

    // Search widget
    const searchWidget = new Search({
      view: view,
      sources: [
        {
          locator: locator,
          url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
          name: "Address Search",
          placeholder: "Search address or place"
        }
      ]
    });
    view.ui.add(searchWidget, "top-right");

    // Camper Feedback button
    const feedbackButton = document.createElement("button");
    feedbackButton.id = "camperFeedbackButton";
    feedbackButton.innerText = "Camping Survey";
    feedbackButton.onclick = function () {
      window.open("https://arcg.is/uWPij1", "_blank");
    };
    view.ui.add(feedbackButton, "bottom-left");

    // Layer list toggle panel
    const layerListElement = document.getElementById("layerList");

    // List of hosted feature layers
    const layerUrls = [
      {
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/0",
        title: "Attractions"
      },
      {
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/1",
        title: "Amenities"
      },
      {
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/2",
        title: "Areas of Interest"
      },
      {
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/3",
        title: "Exhibit Halls"
      },
      {
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/4",
        title: "Parking Areas"
      },
      {
        url: "https://services7.arcgis.com/KzpywwCur5HGJXqP/arcgis/rest/services/EAA/FeatureServer/5",
        title: "Camping Areas"
      }
    ];

    // Load each layer, add to map, and build checkbox
    layerUrls.forEach(layerInfo => {
      const layer = new FeatureLayer({
        url: layerInfo.url,
        title: layerInfo.title,
        outFields: ["*"],
        popupEnabled: true,
        visible: true
      });

      layer.load().then(() => {
        // Use AGOL-configured popup or fallback
        layer.popupTemplate = layer.popupTemplate || layer.createPopupTemplate() || {
          title: layerInfo.title,
          content: "No popup configured for this layer."
        };

        // Add the layer to the map
        map.add(layer);

        // Create checkbox toggle
        const listItem = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.id = layerInfo.title;
        checkbox.addEventListener("change", function () {
          layer.visible = this.checked;
        });

        const label = document.createElement("label");
        label.htmlFor = layerInfo.title;
        label.textContent = layerInfo.title;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        layerListElement.appendChild(listItem);
      });
    });
  });
});