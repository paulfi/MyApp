console.log("myapp");
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "dojo/domReady!"
  ], function(Map, MapView, FeatureLayer){
    var map = new Map({
      basemap: "streets"
    });
    var view = new MapView({
      container: "viewDiv",  // Reference to the scene div created in step 5
      map: map,  // Reference to the map object created before the scene
      zoom: 6,  // Sets zoom level based on level of detail (LOD)
      center: [-123, 53]  // Sets center point of view using longitude,latitude
    });
    var template = {
      title: "<b>{STATION_NUMBER}</b><br>{STATION_NAME}",
       // Four fields are used in this template. The value of the selected feature will be
      // inserted in the location of each field name below
      content: "<p>Current Flow Conditions(m3/s): {FLOW_CURRENT}</p>" +
      "<ul><li>Difference from yesterday: {FLOW_DIFFERENCE}</li>" +
      "<li>Percentile:{FLOW_PERCENTILE}</li>" +
      "<li>Historical Mean: {FLOW_HISTORICAL_MEAN}</li>"+
      "<li>Historical Max: {FLOW_HISTORICAL_MAX}</li>"+
      "<li>Last update: {LAST_UPDATE}</li><ul>"    
  };
    var featureLayer = new FeatureLayer({
            url: "https://services.arcgis.com/lGOekm0RsNxYnT3j/ArcGIS/rest/services/north_america_surface_water_values/FeatureServer/4",
            outFields:["*"],
            popupTemplate: template
          });
      map.add(featureLayer);
  });