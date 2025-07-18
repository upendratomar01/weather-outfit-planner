import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GEO_API_URL, WEATHER_API_URL } from "../../constants/api";

export interface WeatherResponse {
  city: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  weatherCode: number;
}

export interface CitySuggestion {
  id: number | string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  keepUnusedDataFor: 300, // cache data for 5 minutes
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getCitySuggestions: builder.query<CitySuggestion[], string>({
      query: (query) => ({
        url: `${GEO_API_URL}/search`,
        params: { name: query, count: 5 },
      }),
      transformResponse: (response: any): CitySuggestion[] => {
        return (
          response.results?.map((r: any) => ({
            id: r.id,
            name: r.name,
            country: r.country,
            latitude: r.latitude,
            longitude: r.longitude,
          })) || []
        );
      },
    }),

    getWeatherByCoords: builder.query<WeatherResponse, CitySuggestion>({
      query: ({ latitude, longitude }) => ({
        url: `${WEATHER_API_URL}/forecast`,
        params: {
          latitude,
          longitude,
          current_weather: true,
          hourly:
            "temperature_2m,weathercode,windspeed_10m,relative_humidity_2m",
        },
      }),

      transformResponse: (response: any, _, arg): WeatherResponse => {
        const current = response.current_weather;
        const hourly = response.hourly;

        return {
          city: `${arg.name}, ${arg.country}`,
          temperature: current.temperature,
          windSpeed: current.windspeed,
          humidity: hourly.relative_humidity_2m[0],
          weatherCode: current.weathercode,
        };
      },
    }),
  }),
});

export const {
  useLazyGetCitySuggestionsQuery,
  useGetCitySuggestionsQuery,
  useGetWeatherByCoordsQuery,
} = weatherApi;
