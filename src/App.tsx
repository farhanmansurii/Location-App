import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import './App.css';
import InputSearch from './components/InputSearch';
import Map from './MapContainer';
interface Location {
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  year: number;
}
function App() {
  const [selectedLocation, setselectedLocation] = useState<Location[]>([]);
  return (
    <div>
      <div>{selectedLocation.map((e) => <div>{e}</div>)}</div>
      {selectedLocation &&
        <Map selectedLocation={selectedLocation || null} />
      }

      <InputSearch selectedLocation={selectedLocation} setselectedLocation={setselectedLocation} />

    </div>
  )
}

export default App
