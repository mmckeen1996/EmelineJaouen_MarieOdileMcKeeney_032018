map.on('load', function() {

//Pour les abtiments 3D
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

   

//Chargement de notre BDD
    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true. GL-JS will add the point_count property to your source data.
    map.addSource("events", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        "data" : "./evenements-a-paris.geojson",
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

//Cercles

    map.addLayer({
        id: "clusters",
        type: "circle",
        source: "events",
        filter: ["has", "point_count"],
        paint: {
            // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#64E5CB",
                100,
                "#7CBFB7",
                750,
                "#057272"
            ],
            "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "events",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

    map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "events",
        filter: ["!has", "point_count"],
        paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    });

//Pointeur et pop up description des commerces

 map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });

  // if the features have no info, return nothing
  if (!features.length) {
    return;
  }

  var feature = features[0];

  // Populate the popup and set its coordinates
  // based on the feature found

  if (feature.properties.pricing_info) {
     var popup = new mapboxgl.Popup()
  .setLngLat(feature.geometry.coordinates)
  .setHTML('<div id=\'popup\' class=\'popup\' style=\'z-index: 10;\'> <h5> '+ feature.properties.title+  '</h5>' +
  '<ul class=\'list-group\'>' +
  '<li class=\'list-group-item\'> Adresse : ' + feature.properties.placename + ' </li>'+
    '<li class=\'list-group-item\'> Information prix : ' + feature.properties.pricing_info + ' </li>'
 )
  .addTo(map);
  }
  else{
     var popup = new mapboxgl.Popup()
  .setLngLat(feature.geometry.coordinates)
  .setHTML('<div id=\'popup\' class=\'popup\' style=\'z-index: 10;\'> <h5> '+ feature.properties.title+  '</h5>' +
  '<ul class=\'list-group\'>' +
  '<li class=\'list-group-item\'> Adresse : ' + feature.properties.placename + ' </li>' )
  .addTo(map);
  }

});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'
map.on('mousemove', function(e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });
  map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });


 


//Batiments 3D

    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "height"]
            ],
            'fill-extrusion-base': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
            ],
            'fill-extrusion-opacity': .6
        }
     }, labelLayerId);
});