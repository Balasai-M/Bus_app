// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const BusContext = createContext();

export const BusProvider = ({ children }) => {
  const [busDetails, setBusDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]); // Add this line

  // Define the function to update selected seats
  const updateSelectedSeats = (newSelectedSeats) => {
    setSelectedSeats(newSelectedSeats);
  };

  return (
    <BusContext.Provider
      value={{
        busDetails,
        setBusDetails,
        selectedSeats, // Add this line
        updateSelectedSeats, // Add this line
      }}
    >
      {children}
    </BusContext.Provider>
  );
};

export const useBusContext = () => {
  return useContext(BusContext);
};
