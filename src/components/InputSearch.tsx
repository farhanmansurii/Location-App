import { useEffect, useState } from 'react';

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  year: number;
}

const InputSearch: React.FC = () => {
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
        <input type="text" placeholder='Search Any location' style={{ fontSize: '13px', width: 'full', outline: 'none', paddingInline: '1rem', padding: '5px', borderRadius: '1rem' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </form>
      <ul>
        {locations.slice(0, 5).map((location) => (
          <div key={location.name} style={{ fontSize: '10px', width: "inherit", border: '2px', backgroundColor: 'gray', margin: '5px' }}>
            {location.name}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default InputSearch;
