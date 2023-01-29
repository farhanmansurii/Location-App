import { useDispatch, useSelector } from 'react-redux';
import { clearLocationHistory } from '../store/LocationSlice';
import { RootState } from '../store/store';
interface location {
  latitude: number;
  longitude: number;
  display_name: string,
  population?: number
  population_year?: number
}
const LocationHistory = () => {
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);
  const locationHistory = useSelector((state: RootState) => state.location.locationHistory);
  const dispatch = useDispatch();

  // const handleClick = (location: Location) => {

  //   const newLocation = [
  //     location.latitude,
  //     location.longitude
  //   ]
  //   console.log(location.latitude, location.longitude)

  //   dispatch(updateCurrentLocation(newLocation));
  // }

  const handleClearHistory = () => {
    dispatch(clearLocationHistory());
  }

  return (<>

    <div className='search_results'>
      <div style={{ marginTop: '1rem', display: 'flex', backgroundColor: "#243e36", color: "#7ca982", padding: '0.5rem' }}>
        <div style={{
          fontSize
            : '20px', display: 'flex', gap: '10px'
        }}><div >All Recent Locations</div>
          <div onClick={() => handleClearHistory()}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1rem', margin: 'auto', backgroundColor: '#7ca982', color: '#243e36', borderRadius: '4rem', padding: '5px' }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>

      {
        locationHistory.map((e: location) => <div className='result'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{
          width: '1rem', paddingRight: '3px'
        }} >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>{e.display_name}</div>)
      }
    </div>
  </>
  );
}

export default LocationHistory;
