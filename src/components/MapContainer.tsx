import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentLocation } from "../store/LocationSlice";
let DefaultIcon = L.icon({
iconUrl: icon,
shadowUrl: iconShadow,
});

export default function MapWrapper() {
  const currentLocation = useSelector((state) => state.location.currentLocation);
  const dispatch = useDispatch();
  
  useEffect(() => {
    var container = L.DomUtil.get("map");

    if (container != null) {
    container._leaflet_id = null;
    }
    var map = L.map("map").setView([currentLocation.latitude, currentLocation.longitude], 13);
    L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
    attribution:
    'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
    "pk.eyJ1IjoidGFyLWhlbCIsImEiOiJjbDJnYWRieGMwMTlrM2luenIzMzZwbGJ2In0.RQRMAJqClc4qoNwROT8Umg",
    }
    ).addTo(map);
    L.Marker.prototype.options.icon = DefaultIcon;
    var marker = L.marker([currentLocation.latitude, currentLocation.longitude]).addTo(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLocation]);
    return <div id="map" style={{ height: "50vh",width:"50vw",justifySelf:'center' }} ></div>;
    }