import viteLogo from "/vite.svg";
import "./App.css";
import flightData from "./flight_data.json";
import FlightSearch from "./components/FlightSearch";
function App() {
  return (
    <>
      <FlightSearch flights={flightData.flights} />
    </>
  );
}

export default App;
