import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  currentLocation: {
    latitude: number;
    longitude: number;
    display_name: string,
    population?: number
    year?: number
  };
  locationHistory: Array<{
    latitude: number;
    longitude: number;
    display_name: string,
    population?: number
    year?: number
  }>;
}

const initialState: LocationState = {
  currentLocation: {
    latitude: 42.3554334,
    longitude: -71.060511,
    display_name: "Boston, Suffolk County, Massachusetts, United States",
    population: 689326,
    year: 2015
  },
  locationHistory: []
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateCurrentLocation: (state, action: PayloadAction<{
      latitude: number;
      longitude: number;
      display_name: string,
      population?: number
      population_year?: number
    }>) => {
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
