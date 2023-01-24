import { MapContainer, TileLayer } from 'react-leaflet';

interface Location {
  latitude: number;
  longitude: number;
}

const Map = ({ selectedLocation }: { selectedLocation: Location | null }) => {
  return (
    <MapContainer center={selectedLocation} zoom={12} scrollWheelZoom={false} id='map'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default Map;
