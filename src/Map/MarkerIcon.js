import L from 'leaflet';

const markerIcon = new L.Icon({
    iconUrl: require('./geomarker_01.png'),
    iconRetinaUrl: require('./geomarker_01.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 45),
    className: 'markericon'
});

export { markerIcon };
