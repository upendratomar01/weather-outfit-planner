import { Alert, CircularProgress, Box } from "@mui/material";
import CustomAutoComplete from "../../../components/CustomAutoComplete";
import {
  useGetWeatherByCoordsQuery,
  useLazyGetCitySuggestionsQuery,
  type CitySuggestion,
} from "../weatherApi";
import SearchHistory from "./SearchHistory";
import { WeatherCard } from "./WeatherCard";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState, useEffect } from "react";
import { useColorMode } from "../../../context/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useDebounce } from "../../../hooks/useDebounce";
import { addToHistory } from "../weatherSlice";

export default function WeatherDashboard() {
  const dispatch = useAppDispatch();
  const { mode: colorMode } = useColorMode();
  const history = useAppSelector((state) => state.weather.history);

  const [input, setInput] = useState("");
  const [selectedCity, setSelectedCity] = useState<CitySuggestion | null>(null);

  const debouncedInput = useDebounce(input, 300);
  const [
    triggerSuggestions,
    { data: suggestions = [], isFetching: isFetchingSuggestions },
  ] = useLazyGetCitySuggestionsQuery();

  // Fetch city suggestions when input changes
  // Only trigger if input length is 3 or more characters
  useEffect(() => {
    if (debouncedInput.length >= 3) {
      triggerSuggestions(debouncedInput);
    }
  }, [debouncedInput, triggerSuggestions]);

  // Fetch weather data based on selected city coordinates
  // If no city is selected, skip the query
  const {
    data: weatherData,
    isFetching: isFetchingWeather,
    error,
  } = useGetWeatherByCoordsQuery(selectedCity || skipToken);

  // Automatically add selected city to history if not already present
  useEffect(() => {
    if (selectedCity && !history.some((c) => c.id === selectedCity.id)) {
      dispatch(addToHistory(selectedCity));
    }
  }, [selectedCity, history, dispatch]);

  return (
    <>
      <CustomAutoComplete<CitySuggestion>
        label="Search City"
        options={suggestions}
        loading={isFetchingSuggestions}
        onInputChange={(_, value) => setInput(value)}
        onChange={(_, value) => setSelectedCity(value as CitySuggestion)}
        getOptionLabel={(option) => {
          const op = option as CitySuggestion;
          return `${op.name}, ${op.country}`;
        }}
      />

      {isFetchingWeather && (
        <Box display="flex" mt={2} justifyContent="center">
          <CircularProgress size={24} />
        </Box>
      )}

      {error && (
        <Alert
          severity="error"
          variant={colorMode === "dark" ? "outlined" : "standard"}
          sx={{
            mt: 2,
          }}
        >
          City not found or API error.
        </Alert>
      )}

      {weatherData && selectedCity && (
        <WeatherCard data={weatherData} city={selectedCity} />
      )}

      <SearchHistory history={history} onSelect={setSelectedCity} />
    </>
  );
}
