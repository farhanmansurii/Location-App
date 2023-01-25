import { useSelector, useDispatch } from 'react-redux';
import { clearLocationHistory, updateCurrentLocation } from './store/LocationSlice';

const Mapreducer = () => {
  const currentLocation = useSelector((state) => state.location.currentLocation);
  const locationHistory = useSelector((state) => state.location.locationHistory);
  const dispatch = useDispatch();

  const handleClick = () => {
    
    const newLocation = {
      latitude: 52.5487429714954,
      longitude:23
    };
    dispatch(updateCurrentLocation(newLocation));
  }

  const handleClearHistory = () => {
    dispatch(clearLocationHistory());
  }

  return (
    <div>
      <div onClick={handleClick}>update location
      </div>
      <button onClick={handleClearHistory}>Clear Location History</button>
      <div>
        Current Location: {currentLocation.latitude}, {currentLocation.longitude}
      </div>
      <div>
        Location History:<div>
           {locationHistory.map((location) => `(${location.latitude}, ${location.longitude})`).join(', ')}
          </div>
      </div>
    </div>
  );
}

export default Mapreducer;
