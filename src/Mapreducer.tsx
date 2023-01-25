import { useSelector, useDispatch } from 'react-redux';
import { clearLocationHistory, updateCurrentLocation } from './store/LocationSlice';

const Mapreducer = () => {
  const currentLocation = useSelector((state) => state.location.currentLocation);
  const locationHistory = useSelector((state) => state.location.locationHistory);
  const dispatch = useDispatch();

  const handleClick = (location:any) => {
    
    const newLocation = [
     location.latitude,
      location.longitude
    ]
    console.log(location.latitude,location.longitude)
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
           {locationHistory.map((location) => <div onClick={()=>handleClick(location)}>{location.latitude}, {location.longitude}</div>)}
          </div>
      </div>
    </div>
  );
}

export default Mapreducer;
