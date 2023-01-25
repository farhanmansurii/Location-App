import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  locationHistory: Array<{
    latitude: number;
    longitude: number;
  }>;
}

const initialState: LocationState = {
  currentLocation: {
    latitude: 42.3554334,
    longitude: -71.060511
  },
  locationHistory: []
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateCurrentLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.currentLocation = action.payload;
      state.locationHistory.push(action.payload);
    },
    clearLocationHistory: (state) => {
      state.locationHistory = [];
    }
  }
});

export const { updateCurrentLocation, clearLocationHistory } = locationSlice.actions;

export default locationSlice.reducer;
