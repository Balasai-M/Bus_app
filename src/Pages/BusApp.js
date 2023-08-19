import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import BusList from "./BusList"; // Import the BusList component
import { BusProvider } from "../Context/AuthContext"; // Assuming you have a BusProvider for context

function BusApp() {
  // const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(null); // State to hold search results

  const handleSearch = ({ source, destination, date }) => {
    // Simulate fetching bus data based on search criteria
    const fakeSearchResults = [
      { id: 1, number: "A123", route: "Route 1", seats: 40, availableSeats: 30, bookedSeats: 10 },
      { id: 2, number: "B456", route: "Route 2", seats: 35, availableSeats: 25, bookedSeats: 10 },
      // Add more fake search results...
    ];

    setSearchResults(fakeSearchResults);

    // Optionally, you can navigate to the BusList section after search
    // navigate("/bus-list");
  };

  return (
    <BusProvider>
      <div>
        <Header />
        <SearchForm onSearch={handleSearch} />
        <div className="content">
          {/* Pass the search results to the BusList component */}
          <BusList buses={searchResults} />
        </div>
      </div>
    </BusProvider>
  );
}

export default BusApp;
