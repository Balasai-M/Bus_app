import React from "react";
import { useNavigate } from "react-router-dom";
import "./BusList.css";

const initialBuses = [
  {
    id: 1,
    number: "A123",
    route: "Route 1",
    seats: 40,
    availableSeats: 30,
    bookedSeats: 10,
  },
  {
    id: 2,
    number: "B456",
    route: "Route 2",
    seats: 35,
    availableSeats: 25,
    bookedSeats: 10,
  },
  {
    id: 3,
    number: "C789",
    route: "Route 3",
    seats: 50,
    availableSeats: 40,
    bookedSeats: 10,
  }  
];

function BusList() {
  const navigate = useNavigate();

  localStorage.setItem("availableBuses", JSON.stringify(initialBuses));
  
  let data1 = JSON.parse(localStorage.getItem("availableBuses"));

  let selectedTicked = JSON.parse(localStorage.getItem("selectedSeats")) || [];

  let bookedTickets = JSON.parse(localStorage.getItem("bookedTickets")) || [];

  const handleViewDetails = (busId) => {
    navigate(`/bus-details/${busId}`);
  };

  return (
    <div className="bus-list-container">
      <h2>Available Buses</h2>
      <table className="bus-table">
        <tbody>
          {data1.map((bus) => {
            let alreadyBooked = bookedTickets.filter(
              (x) => bus.id === x.busDetails
            );

            let alreadySelected = selectedTicked.filter(
              (x) => bus.id === x.busDetails
            );

            return (
              <tr className="bus-card" key={bus.id}>
                <td>Bus Number: {bus?.number || "-"}</td>
                <td>Route: {bus?.route || "-"}</td>
                <td>Total Seats: {bus?.seats || 0}</td>
                <td>
                  Available Seats:{" "}
                  {bus?.seats - (alreadyBooked.length + alreadySelected.length) || 0}
                </td>
                <td>
                  Booked Seats: {alreadyBooked.length + alreadySelected.length || 0}
                </td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => handleViewDetails(bus.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BusList;
