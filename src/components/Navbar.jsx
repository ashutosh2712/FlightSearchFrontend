import React from "react";
import Flight from "../assets/plane.png";
import Hotel from "../assets/hotel.png";
import Cab from "../assets/cab.png";
import Holidays from "../assets/holidays.png";
import Login from "../assets/login.png";
const Navbar = () => {
  return (
    <div className="navContainer">
      <h1>FlightSearch</h1>
      <div className="navLeftItems">
        <div className="flightsIcon">
          <img src={Flight} alt="plane" />
          <p>Flights</p>
        </div>
        <div className="flightsIcon">
          <img src={Hotel} alt="hotel" />
          <p>Hotels</p>
        </div>
        <div className="flightsIcon">
          <img src={Holidays} alt="holiday" />
          <p>Holidays</p>
        </div>
        <div className="flightsIcon">
          <img src={Cab} alt="cab" />
          <p>Cab</p>
        </div>
      </div>
      <div className="navRightItems">
        <div className="flightsIcon">
          <img src={Login} alt="login" />
          <p>SignUp</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
