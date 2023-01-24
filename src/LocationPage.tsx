import useLocationSearch from "./hooks/useLocation";

const LocationPage = () => {
  const { searchTerm, setSearchTerm, locations, handleLocationSelect } = useLocationSearch();

  return (
    <div>
      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(current => e.target.value)}
        />
      </form>
      <ul>
        {locations.map(location => (
          <div className="border-2" key={location.name} onClick={() => handleLocationSelect(location)}>
            {location.name} - Population: {location.population}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default LocationPage;
