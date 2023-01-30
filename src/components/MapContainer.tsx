import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/store";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

export default function MapWrapper() {
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    var container = L.DomUtil.get("map");

    if (container) {
      (container as any)._leaflet_id = null;
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
      },

    ).addTo(map);
    L.Marker.prototype.options.icon = DefaultIcon;
    var marker = L.marker([currentLocation.latitude, currentLocation.longitude]).addTo(map);
  }, [currentLocation]);
  return <div id="map" style={{ minWidth: '350px', justifySelf: 'center' }} ></div>;
}
