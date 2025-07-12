import { Card, CardContent, Grid, Typography } from "@mui/material";
import { type WeatherResponse } from "../weatherApi";
import {
  getWeatherCondition,
  getWeatherSuggestion,
} from "../utils/weatherCondition";
import { WetherCardItem } from "./WeatherCardItem";
import {
  AcUnit,
  Cloud,
  Grain,
  Thunderstorm,
  WbSunny,
} from "@mui/icons-material";

type WeatherCardProps = {
  data: WeatherResponse;
};

const getWeatherIcon = (intCode: number) => {
  if ([0, 1].includes(intCode))
    return <WbSunny fontSize="large" sx={{ color: "#fbc02d" }} />; // yellow
  if ([2, 3].includes(intCode))
    return <Cloud fontSize="large" sx={{ color: "#90a4ae" }} />; // gray-blue
  if ([45, 48].includes(intCode))
    return <AcUnit fontSize="large" sx={{ color: "#4fc3f7" }} />; // icy blue
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(intCode))
    return <Grain fontSize="large" sx={{ color: "#2196f3" }} />; // rainy blue
  if ([95, 96, 99].includes(intCode))
    return <Thunderstorm fontSize="large" sx={{ color: "#673ab7" }} />; // purple storm
  return <Cloud fontSize="large" sx={{ color: "#90a4ae" }} />;
};

export const WeatherCard = ({ data }: WeatherCardProps) => {
  const { city, weatherCode, humidity, temperature, windSpeed } = data;
  const suggestion = getWeatherSuggestion(weatherCode); // Get suggestion based on weather code
  const weatherCondition = getWeatherCondition(weatherCode); // Get weather condition based on weather code

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        {getWeatherIcon(weatherCode)}
        <Typography variant="h6" mb={2}>
          {city}
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
