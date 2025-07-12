import { Container } from "@mui/material";
import Header from "./components/Header";
import WeatherDashboard from "./features/weather/components/WeatherDashboard";

const App = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <WeatherDashboard />
      </Container>
    </>
  );
};

export default App;
