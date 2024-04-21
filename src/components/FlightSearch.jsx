import React, { useState } from "react";
import Flight from "../assets/airline.png";
const FlightSearch = ({ flights }) => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [tripType, setTripType] = useState("oneWay");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const [searchResults, setSearchResults] = useState([]);

  // Function to calculate and format the duration
  const calculateDuration = (departureTime, arrivalTime) => {
    // Parse departure and arrival times into Date objects
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);

    // Calculate the difference in milliseconds
    const durationMs = arrival - departure;

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    // Format the duration
    return `${hours}h${minutes}m`;
  };

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
        <h2>SearchResults</h2>
        {searchResults ? (
          <div className="flightResults">
            {tripType === "oneWay" ? (
              searchResults.length > 0 ? (
                <table className="htmlTable">
                  <thead className="htmlTableHead">
                    <th className="htmlTableTh">DERPERTURE</th>
                    <th className="htmlTableTh">DURATION</th>
                    <th className="htmlTableTh">ARRIVAL</th>
                    <th className="htmlTableTh">PRICE</th>
                    <th className="htmlTableTh"></th>
                  </thead>
                  <tbody>
                    {searchResults.map((flight) => (
                      <tr key={flight.flight_number} className="htmlTableTr">
                        <td className="htmlTableTd">
                          <div className="airlineHeader">
                            <div className="airline">
                              <img src={Flight} alt="" />
                              {flight.airline} - {flight.flight_number}
                            </div>
                            <div className="airportDetails">
                              <p>
                                <b>{flight.departure_airport} </b>
                                {flight.departure_city}{" "}
                              </p>
                              <h3>{flight.departure_time.substring(11, 16)}</h3>
                            </div>
                          </div>
                        </td>
                        <td className="htmlTableTd">
                          <div className="airportDetails">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <b>
                              {calculateDuration(
                                flight.departure_time,
                                flight.arrival_time
                              )}
                            </b>
                          </div>
                        </td>
                        <td className="htmlTableTd">
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div className="airportDetails">
                            <p>
                              <b>{flight.arrival_airport} </b>
                              {flight.arrival_city}{" "}
                            </p>
                            <h3>{flight.arrival_time.substring(11, 16)}</h3>
                          </div>
                        </td>
                        <td className="htmlTableTd">
                          <div className="airportDetails">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <b>$ {flight.price}</b>
                          </div>
                        </td>
                        <td className="htmlTableTd">
                          <div className="airportDetails">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <button className="bookButton">Book Now</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No one-way flights found.</p>
              )
            ) : (
              <div className="roundTripFlights">
                <h4>Outbound Flights</h4>
                {searchResults.outbound && searchResults.outbound.length > 0 ? (
                  <table className="htmlTable">
                    <thead className="htmlTableHead">
                      <th className="htmlTableTh">DERPERTURE</th>
                      <th className="htmlTableTh">DURATION</th>
                      <th className="htmlTableTh">ARRIVAL</th>
                      <th className="htmlTableTh">PRICE</th>
                      <th className="htmlTableTh"></th>
                    </thead>
                    <tbody>
                      {searchResults.outbound.map((flight) => (
                        <tr key={flight.flight_number} className="htmlTableTr">
                          <td className="htmlTableTd">
                            <div className="airlineHeader">
                              <div className="airline">
                                <img src={Flight} alt="" />
                                {flight.airline} - {flight.flight_number}
                              </div>
                              <div className="airportDetails">
                                <p>
                                  <b>{flight.departure_airport} </b>
                                  {flight.departure_city}{" "}
                                </p>
                                <h3>
                                  {flight.departure_time.substring(11, 16)}
                                </h3>
                              </div>
                            </div>
                          </td>
                          <td className="htmlTableTd">
                            <div className="airportDetails">
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <b>
                                {calculateDuration(
                                  flight.departure_time,
                                  flight.arrival_time
                                )}
                              </b>
                            </div>
                          </td>
                          <td className="htmlTableTd">
                            <div>&nbsp;</div>
                            <div>&nbsp;</div>
                            <div>&nbsp;</div>
                            <div className="airportDetails">
                              <p>
                                <b>{flight.arrival_airport} </b>
                                {flight.arrival_city}{" "}
                              </p>
                              <h3>{flight.arrival_time.substring(11, 16)}</h3>
                            </div>
                          </td>
                          <td className="htmlTableTd">
                            <div className="airportDetails">
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <b>$ {flight.price}</b>
                            </div>
                          </td>
                          <td className="htmlTableTd">
                            <div className="airportDetails">
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <button className="bookButton">Book Now</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No outbound flights found.</p>
                )}
                <h4>Return Flights</h4>

                {searchResults.return && searchResults.return.length > 0 ? (
                  <table className="htmlTable">
                    <thead className="htmlTableHead">
                      <th className="htmlTableTh">DERPERTURE</th>
                      <th className="htmlTableTh">DURATION</th>
                      <th className="htmlTableTh">ARRIVAL</th>
                      <th className="htmlTableTh">PRICE</th>
                      <th className="htmlTableTh"></th>
                    </thead>
                    <tbody>
                      {searchResults.return.map((flight) => (
                        <tr key={flight.flight_number} className="htmlTableTr">
                          <td className="htmlTableTd">
                            <div className="airlineHeader">
                              <div className="airline">
                                <img src={Flight} alt="" />
                                {flight.airline} - {flight.flight_number}
                              </div>
                              <div className="airportDetails">
                                <p>
                                  <b>{flight.departure_airport} </b>
                                  {flight.departure_city}{" "}
                                </p>
                                <h3>
                                  {flight.departure_time.substring(11, 16)}
                                </h3>
                              </div>
                            </div>
                          </td>
                          <td className="htmlTableTd">
                            <div className="airportDetails">
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <b>
                                {calculateDuration(
                                  flight.departure_time,
                                  flight.arrival_time
                                )}
                              </b>
                            </div>
                          </td>
                          <td className="htmlTableTd">
                            <div>&nbsp;</div>
                            <div>&nbsp;</div>
                            <div>&nbsp;</div>
                            <div className="airportDetails">
                              <p>
                                <b>{flight.arrival_airport} </b>
                                {flight.arrival_city}{" "}
                              </p>
                              <h3>{flight.arrival_time.substring(11, 16)}</h3>
                            </div>
                          </td>
                          <td className="htmlTableTd">
                            <div className="airportDetails">
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <b>$ {flight.price}</b>
                            </div>
                          </td>
                          <td className="htmlTableTd">
                            <div className="airportDetails">
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <p></p>
                              <button className="bookButton">Book Now</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
