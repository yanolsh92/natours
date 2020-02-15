/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoieWFub2xzaCIsImEiOiJjazZqdmJ2aHAwMGI0M29wMWptZjh0eHRhIn0.jyCvNSDIoEZMgiDNn7TUAw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/yanolsh/ck6jvsojz06yo1iuom8z3g3vs',
    scrollZoom: false
    // center: [-118.1134391, 34.111745],
    // zoom: 10,
    // itteractive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    //Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
