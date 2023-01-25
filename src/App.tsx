import 'leaflet/dist/leaflet.css';
import './App.css';
import { useState } from 'react'
import MapWrapper from './components/MapContainer';
import Map from './components/MapContainer';
import Mapreducer from './Mapreducer';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { clearLocationHistory, updateCurrentLocation } from './store/LocationSlice';
interface Location {
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  year: number;
}


// const [querysearch, setquerysearch] = useState("");

// const handleChange = (event:string) => {
//   setSearchTerm(event.target.value);
// }

// const handleSubmit = (event) => {
//   event.preventDefault();
//   fetchData(searchTerm);
// }

// const { data, status, error } = useQuery(['search', searchTerm], fetchData);

// async function fetchData(searchTerm) {
//   const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   return response.json();
// }
function App() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(searchTerm)
  }
  const currentLocation = useSelector((state) => state.location.currentLocation);
  const locationHistory = useSelector((state) => state.location.locationHistory);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    
    const newLocation = {
      latitude: e.lat,
      longitude:e.lon
    };
   dispatch(updateCurrentLocation(newLocation));
  }
  const { data, status, error } = useQuery(['search', searchTerm], fetchData);

  async function fetchData(searchTerm: string) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=Boston&format=json`);
    return response.json();
  }
  return (
    <div>
      <Mapreducer />

      <form onSubmit={handleSubmit}>

        <input type="text" value={searchTerm} onChange={
          (event: any) => {
            setSearchTerm(event.target.value);
          }
        } placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'error' && <div>Error: {error.message}</div>}
      {status === 'success' && <div> {data.map((e: any) => <div onClick={()=>handleClick(e)}>{e.display_name}</div>)}</div>}
      <MapWrapper />
    </div>
  )
}

export default App
