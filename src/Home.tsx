import { useQuery, useQueryClient } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DetailsComponent from './components/DetailsComponent';
import LocationHistory from './components/LocationHistory';
import MapWrapper from './components/MapContainer';
import { updateCurrentLocation } from './store/LocationSlice';

export default function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const latitude = parseFloat(params.get('latitude')) || currentLocation.latitude
    const longitude = parseFloat(params.get('longitude')) || currentLocation.longitude
    const population = parseInt(params.get('population')) || currentLocation.population
    const display_name = (params.get('display_name')) || currentLocation.display_name
    const year = parseInt(params.get('year')) || currentLocation.year
    const newLocation = {
      latitude, longitude, population, display_name , year
    }
    if (locationHistory.some(location => location.latitude === newLocation.latitude)) {
      console.log("exists")
    } else {
      dispatch(updateCurrentLocation(newLocation));
    }
  }, [])

  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState("");
  const [ishidden, setisHidden] = useState(true);
  const [queryTerm, setqueryTerm] = useState("");
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(searchTerm)
  }
  const currentLocation = useSelector((state: any) => state.location.currentLocation);
  const locationHistory = useSelector((state: any) => state.location.locationHistory);
  const dispatch = useDispatch();

  const handleClick = (e: any) => {

    const newLocation = {
      latitude: e.lat,
      longitude: e.lon,
      display_name: e.display_name,
      population: e.extratags.population,
      year:e.extratags['census:population']
    };
    const params = new URLSearchParams();
    params.set("latitude", newLocation.latitude)
    params.set("longitude", newLocation.longitude)
    params.set("display_name", newLocation.display_name)
    params.set("population", newLocation.population)
    params.set("year", newLocation.year)
    window.history.pushState({}, '', `?${params.toString()}`)
    if (locationHistory.some(location => location.latitude === newLocation.latitude)) {
      console.log("exists")
    } else {
      dispatch(updateCurrentLocation(newLocation));
    }

  }
  const { data, status } = useQuery({ queryKey: ['queryTerm', queryTerm], queryFn: () => fetchData(queryTerm) });

  async function fetchData(searchTerm: string) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=jsonv2&type=administrative&extratags=1`);
    return response.json();
  }
  return (
    <>
      <h1 style={{
        color: "#7ca982",
        textAlign: 'center'
      }}>Location App</h1>
      <div>
        <form className="form" onSubmit={handleSubmit} style={{ marginBottom: '0.5rem' }}>
          <button type="submit" onClick={() => { setqueryTerm(searchTerm), setSearchTerm('') }}>
            <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
              <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
          <input className="input" value={searchTerm} onChange={
            (event: any) => {
              setisHidden(false)
              setSearchTerm(event.target.value);
            }
          } placeholder="Search Any Location" type="text" />
          <button className="reset" type="reset">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </form>

        {status === 'loading' &&
          <div style={{ color: "#7ca982" }}>Loading Places.</div>}
        {
          status === 'success' && <div className='search_results'> {!ishidden && data.map((e: any, i: number) =>
            e.type === 'administrative' &&
            <div className='result' key={i} onClick={() => { handleClick(e), setisHidden(true) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{
                width: '1rem', paddingRight: '3px'
              }} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {e.display_name}
            </div>

          )

          }</div>
        }
        <DetailsComponent data={currentLocation} />
        <MapWrapper />
        {
          locationHistory.length > 0 &&
          <LocationHistory />}
      </div >
    </>
  )
}
