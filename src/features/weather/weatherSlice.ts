import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CitySuggestion } from "./weatherApi";

interface WeatherState {
  history: CitySuggestion[];
}

const initialState: WeatherState = {
  history: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<CitySuggestion>) {
      const city = action.payload;
      // Add the city to the history, ensuring no duplicates and limiting to 5 items
      state.history = [
        city,
        ...state.history.filter((c) => c.id !== city.id),
      ].slice(0, 5);
    },
  },
});

export const { addToHistory } = weatherSlice.actions;
export default weatherSlice.reducer;
