import viteLogo from "/vite.svg";
import "./App.css";
import flightData from "./flight_data.json";
import FlightSearch from "./components/FlightSearch";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <FlightSearch flights={flightData.flights} />
    </>
  );
}

export default App;
