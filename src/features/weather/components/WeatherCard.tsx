import { Card, CardContent, Grid, Typography } from "@mui/material";
import { type CitySuggestion, type WeatherResponse } from "../weatherApi";
import {
  getWeatherCondition,
  getWeatherSuggestion,
} from "../utils/weatherCondition";
import { WetherCardItem } from "./WeatherCardItem";

type WeatherCardProps = {
  data: WeatherResponse;
  city: CitySuggestion;
};

export const WeatherCard = ({ data, city }: WeatherCardProps) => {
  const { weatherCode, humidity, temperature, windSpeed } = data;
  const suggestion = getWeatherSuggestion(weatherCode); // Get suggestion based on weather code
  const weatherCondition = getWeatherCondition(weatherCode); // Get weather condition based on weather code

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          {city.name}, {city.country}
        </Typography>

        <Grid container spacing={2}>
          <WetherCardItem label="Temperature" value={temperature} />
          <WetherCardItem label="Humidity" value={humidity} />
          <WetherCardItem label="Wind Speed" value={windSpeed} />
          <WetherCardItem label="Weather Condition" value={weatherCondition} />
          <WetherCardItem label="Suggestion" value={suggestion} fullWidth />
        </Grid>
      </CardContent>
    </Card>
  );
};
