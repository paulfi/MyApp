$(document).ready(function(){
  //basic map
  var map = L.map('map').setView([51, -123.667], 10);
  L.esri.basemapLayer("Topographic").addTo(map);
  var stationLyr = L.esri.featureLayer({
    url: "https://services.arcgis.com/lGOekm0RsNxYnT3j/ArcGIS/rest/services/north_america_surface_water_values/FeatureServer/4"
  }).addTo(map);
  var template = "<b>{STATION_NUMBER}</b><br>{STATION_NAME}"+
      "<p>Current Flow Conditions(m3/s): {FLOW_CURRENT}</p>" +
      "<ul><li>Difference from yesterday: {FLOW_DIFFERENCE}</li>" +
      "<li>Percentile:{FLOW_PERCENTILE}</li>" +
      "<li>Historical Mean: {FLOW_HISTORICAL_MEAN}</li>"+
      "<li>Historical Max: {FLOW_HISTORICAL_MAX}</li>"+
      "<li>Last update: {LAST_UPDATE}</li><ul>";
  stationLyr.bindPopup(function (layer) {
    return L.Util.template(template, layer.feature.properties);
  });
  //need to load https://openmaps.gov.bc.ca/geo/pub/WHSE_ENVIRONMENTAL_MONITORING.ENVCAN_HYDROMETRIC_STN_SP/ows?service=WMS&request=GetCapabilities
  // add to map with popup... popup should have link for graphs
  // draw graphs with loadDailyJson(station) or loadHistoricJson(station)... this will also trigger graph redraw
});