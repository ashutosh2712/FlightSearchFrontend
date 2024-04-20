import React, { useState } from "react";

const FlightSearch = ({ flights }) => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [tripType, setTripType] = useState("oneWay");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    let results = [];
    if (tripType === "oneWay") {
      results = flights.filter(
        (flight) =>
          flight.departure_city.toLowerCase() === departureCity.toLowerCase() &&
          flight.arrival_city.toLowerCase() === arrivalCity.toLowerCase() &&
          flight.price >= minPrice &&
          flight.price <= maxPrice
      );
    } else if (tripType === "roundTrip") {
      const outboundFlights = flights.filter(
        (flight) =>
          flight.departure_city.toLowerCase() === departureCity.toLowerCase() &&
          flight.arrival_city.toLowerCase() === arrivalCity.toLowerCase() &&
          flight.price >= minPrice &&
          flight.price <= maxPrice
      );

      const returnFlights = flights.filter(
        (flight) =>
          flight.departure_city.toLowerCase() === arrivalCity.toLowerCase() &&
          flight.arrival_city.toLowerCase() === departureCity.toLowerCase() &&
          flight.price >= minPrice &&
          flight.price <= maxPrice
      );
      results = { outbound: outboundFlights, return: returnFlights };
    }
    setSearchResults(results);
  };

  return (
    <div className="flightContainer">
      <div className="filterContainer">
        <div className="tripFilters">
          <div className="formContainerTrip">
            <label>
              <input
                type="radio"
                name="oneWay"
                value="oneWay"
                id="oneWay"
                checked={tripType === "oneWay"}
                onChange={() => setTripType("oneWay")}
              />
              One Way
            </label>
          </div>
          <div className="formContainerTrip">
            <label>
              <input
                type="radio"
                name="roundTrip"
                value="roundTrip"
                id="roundTrip"
                checked={tripType === "roundTrip"}
                onChange={() => setTripType("roundTrip")}
              />
              Round Trip
            </label>
          </div>
        </div>
        <div className="cityFilters">
          <div className="formContainerInput">
            <label htmlFor="departureCity">Departure City:</label>
            <input
              type="text"
              id="departureCity"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              className="cityInput"
            />
          </div>
          <div className="formContainerInput">
            <label htmlFor="arrivalCity">Arrival City:</label>
            <input
              type="text"
              id="arrivalCity"
              value={arrivalCity}
              onChange={(e) => setArrivalCity(e.target.value)}
              className="cityInput"
            />
          </div>
        </div>

        <div className="priceFilters">
          <div className="minMaxFilter">
            <div className="minFilter">
              <label htmlFor="minPrice">Min Price:</label>
              <input
                type="range"
                id="minPrice"
                min="0"
                max="1000"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
              />
              <p>${minPrice}</p>
            </div>
            <div className="maxFilter">
              <label htmlFor="maxPrice">Max Price:</label>
              <input
                type="range"
                id="maxPrice"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <p>${maxPrice}</p>
            </div>
          </div>
          <p>
            Price Range: ${minPrice} - ${maxPrice}
          </p>
        </div>
        <button onClick={handleSearch} className="searchButton">
          Search
        </button>
      </div>

      <div className="resultContainer">
        <h3>SearchResults</h3>
        {searchResults ? (
          <div className="flightResults">
            {tripType === "oneWay" ? (
              searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((flight) => (
                    <li key={flight.flight_number}>
                      {flight.airline} - {flight.flight_number} :{" "}
                      {flight.departure_city} to {flight.arrival_city} (
                      {flight.departure_time} - {flight.arrival_time})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No one-way flights found.</p>
              )
            ) : (
              <div className="roundTripFlights">
                <h4>Outbound Flights</h4>
                {searchResults.outbound && searchResults.outbound.length > 0 ? (
                  <ul>
                    {searchResults.outbound.map((flight) => (
                      <li key={flight.flight_number}>
                        {flight.airline} - {flight.flight_number} :{" "}
                        {flight.departure_city} to {flight.arrival_city} (
                        {flight.departure_time} - {flight.arrival_time})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No outbound flights found.</p>
                )}
                <h4>Return Flights</h4>
                {searchResults.return && searchResults.return.length > 0 ? (
                  <ul>
                    {searchResults.return.map((flight) => (
                      <li key={flight.flight_number}>
                        {flight.airline} - {flight.flight_number} :{" "}
                        {flight.departure_city} to {flight.arrival_city} (
                        {flight.departure_time} - {flight.arrival_time})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No return flights found.</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
