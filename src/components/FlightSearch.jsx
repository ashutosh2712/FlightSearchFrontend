import React, { useState } from "react";

const FlightSearch = ({ flights }) => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [searhResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = flights.filter(
      (flight) =>
        flight.departure_city.toLowerCase() === departureCity.toLowerCase() &&
        flight.arrival_city.toLowerCase() === arrivalCity.toLowerCase()
    );
    setSearchResults(results);
  };

  return (
    <div className="flightContainer">
      <h1>FlightSearch</h1>
      <div className="formContainer">
        <label htmlFor="departureCity">Departure City:</label>
        <input
          type="text"
          id="departureCity"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
        />
      </div>

      <div className="formContainer">
        <label htmlFor="arrivalCity">Arrival City:</label>
        <input
          type="text"
          id="arrivalCity"
          value={arrivalCity}
          onChange={(e) => setArrivalCity(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
      <div className="resultContainer">
        <h3>SearchResults</h3>
        <ul>
          {searhResults.map((flight) => (
            <li key={flight.flight_number}>
              {flight.airline} - {flight.flight_number} :{" "}
              {flight.departure_city} to {flight.arrival_city} (
              {flight.departure_time} - {flight.arrival_time})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlightSearch;
