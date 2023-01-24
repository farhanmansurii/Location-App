import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import './App.css';
import InputSearch from './components/InputSearch';
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
      <InputSearch />
    </div>
  )
}

export default App
