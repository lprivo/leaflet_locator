import React from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import "./Mapleaflet.css";
import "./leaflet.css";
import { markerIcon } from "./MarkerIcon.js";

export const MapLeaflet = ({ className, userLatitude, userLongitude }) => {

    const position = [userLatitude, userLongitude];

    return (
        <Map className={className} center={position} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={position} icon={markerIcon}>
                <Popup>Your location.</Popup>
            </Marker>
        </Map>
    );
};

export default MapLeaflet;
