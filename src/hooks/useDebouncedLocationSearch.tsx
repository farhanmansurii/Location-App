import { useCallback, useEffect, useState } from 'react';

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  year: number;
}

const useDebouncedLocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  const debouncedSearch = useCallback(
    (term: string) => {
      clearTimeout(searchTimeout);
      setSearchTimeout(
        setTimeout(() => {
          async function fetchData() {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${term}&format=json&type=administrative`);
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
          fetchData();
        }, 300)
      );
    },
    [searchTimeout]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [debouncedSearch, searchTerm]);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  }

  return {
    searchTerm,
    setSearchTerm,
    locations,
    selectedLocation,
    handleLocationSelect
  };
}

export default useDebouncedLocationSearch;
