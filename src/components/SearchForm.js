import React, { useState } from "react";
import './SearchForm.css'

const fakeDepartures = [
  "City A",
  "City B",
  "City C",
  // Add more fake departure options here...
];

const fakeDestinations = [
  "City X",
  "City Y",
  "City Z",
  // Add more fake destination options here...
];

function SearchForm({ onSearch }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    // Call the onSearch prop with the selected options
    onSearch({ source, destination, date });
  };

  return (
    <div className="search-form">
      <h2>Search Buses</h2>
      <div className="search-fields">
        <label htmlFor="source">Departure:</label>
        <select
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="">Select Departure</option>
          {fakeDepartures.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label htmlFor="destination">Destination:</label>
        <select
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="">Select Destination</option>
          {fakeDestinations.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button className="search-button" onClick={handleSearch}>
        Search Buses
      </button>
    </div>
  );
}

export default SearchForm;
