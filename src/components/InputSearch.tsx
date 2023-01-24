import { useEffect, useState } from 'react';

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  year: number;
}

const InputSearch: React.FC = ({ setSelectedLocation, selectedLocation }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  async function fetchData() {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&type=administrative`);
    const data = await response.json();
    const locationData = data.map((location: any) => ({
      name: location.display_name,
      latitude: location.lat,
      longitude: location.lon,
      population: location.population,
      year: location.year,
    }));
    setLocations(locationData);
  }
  useEffect(() => {
    setSearchTimeout(setTimeout(() => {

      if (searchTerm) {
        fetchData();
      }
    }, 1000));
  }, [searchTerm]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </form>
      <ul>
        {locations.slice(0, 5).map((location) => (
          <li key={location.name} >
            {location.name}
            <button onClick={() => { console.log([location.latitude, location.longitude]), selectedLocation([location.latitude, location.longitude]) }}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputSearch;
