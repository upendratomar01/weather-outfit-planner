# 🌦️ Weather-Based Outfit Recommender

A responsive React + TypeScript web app that helps users check the current weather of any city and recommends an outfit based on the conditions. It also remembers your last 5 searches and lets you switch between light and dark themes.

---

## 🚀 Features

### 🔍 City Search with Suggestions
- Type any city name to fetch live suggestions (via Open-Meteo Geocoding API).
- Suggestions are debounced for performance.

### 🌦️ Weather Forecast
- Displays:
  - Temperature (°C)
  - Wind Speed (km/h)
  - Humidity (%)
  - Condition (with suggestion like umbrella, sunglasses, etc.)

### 🧠 Search History
- Stores and displays the last 5 searched cities (in-memory).
- Re-selecting a city from history re-fetches its weather.

### 🌗 Theme Switcher
- Toggle between light and dark mode instantly.

### ⚙️ Technical Stack
- **React + TypeScript + Vite**
- **Redux Toolkit + RTK Query** for state and API
- **Material UI (MUI)** for UI components
- **Custom Hooks** like `useDebounce`
- **Context API** for theme switching


---

## 🛠️ Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/upendratomar01/weather-outfit-planner.git
cd weather-outfit-app
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Setup Environment Variables**

```bash
VITE_GEO_API_URL=https://geocoding-api.open-meteo.com/v1
VITE_WEATHER_API_URL=https://api.open-meteo.com/v1
```
No API key needed — Open-Meteo is free to use without authentication.

### 4. **Start the App Locally**

```bash
npm run dev
```

This will open the app in your browser at http://localhost:5173

