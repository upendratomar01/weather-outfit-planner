export const WEATHER_CONDITIONS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm (slight or moderate)",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

// Returns the weather condition for the given weather code.
// Corresponding weather condition string, or "Unknown" if not found

export const getWeatherCondition = (code: number): string => {
  return WEATHER_CONDITIONS[code] ?? "Unknown";
};

// write a function to get suggestion based on condition code, like take unbrella, wear warm clothes, etc.
export const getWeatherSuggestion = (code: number): string => {
  switch (code) {
    case 0:
    case 1:
    case 2:
      return "It's clear, no special suggestions.";
    case 3:
    case 45:
    case 48:
      return "Might be chilly, consider a light jacket.";
    case 51:
    case 53:
    case 55:
      return "Light drizzle, you might want an umbrella.";
    case 61:
    case 63:
    case 65:
      return "Rainy weather, definitely take an umbrella!";
    case 71:
    case 73:
    case 75:
      return "Snowy conditions, wear warm clothes and boots.";
    default:
      return "Weather condition unknown, dress appropriately.";
  }
};
