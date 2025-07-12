import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  history: string[];
}

const initialState: WeatherState = {
  history: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<string>) {
      const city = action.payload;
      state.history = [city, ...state.history.filter((c) => c !== city)].slice(
        0,
        5
      );
    },
  },
});

export const { addToHistory } = weatherSlice.actions;
export default weatherSlice.reducer;
