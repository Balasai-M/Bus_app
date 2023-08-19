import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCouch, FaUsers } from "react-icons/fa";
import "./BusDetail.css";
import Header from "../components/Header";
// import { useBusContext } from "../Context/AuthContext";

const BusDetail = () => {
  const history = useNavigate();
  const { busId } = useParams();

  const availableBuses = [
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
    },
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [available, setAvailable] = useState(0);

  const [selected, setSelected] = useState(0);

  const busDetails = availableBuses.find((bus) => bus.id === parseInt(busId));

  const handleSeatClick = (seatNumber) => {
    const storedSelectedSeats =
      JSON.parse(localStorage.getItem("selectedSeats")) || [];

    let alreadySelected = storedSelectedSeats.findIndex(
      (x) =>
        busDetails.id === x.busDetails &&
        x.seat_number === seatNumber.seat_number &&
        x.passenger_email === seatNumber.passenger_email
    );

    console.log(seatNumber, "seatNumber", storedSelectedSeats);

    if (alreadySelected > -1) {
      setSelectedSeats(selectedSeats.filter((x, i) => alreadySelected !== x));
      localStorage.setItem(
        "selectedSeats",
        JSON.stringify(
          storedSelectedSeats.filter((x, i) => i !== alreadySelected)
        )
      );
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
      localStorage.setItem(
        "selectedSeats",
        JSON.stringify([...storedSelectedSeats, seatNumber])
      );
    }
  };

  const handleProceedToPayment = () => {
    if (!busDetails) {
      console.error("Bus details are not available.");
      return;
    }

    const updatedBusDetails = {
      ...busDetails,
      bookedSeats: busDetails.bookedSeats + selectedSeats.length,
      availableSeats: busDetails.availableSeats - selectedSeats.length,
    };

    const updatedAvailableBuses = availableBuses.map((bus) => {
      if (bus.id === busDetails.id) {
        return updatedBusDetails;
      } else {
        return bus;
      }
    });

    localStorage.setItem(
      "availableBuses",
      JSON.stringify(updatedAvailableBuses)
    );

    history(`/bus/payment/${busId}`);
  };

  const renderSeats = () => {
    if (!busDetails) {
      return null;
    }

    let userDetails = JSON.parse(localStorage.getItem("userDetails"));

    let bookedTickets = JSON.parse(localStorage.getItem("bookedTickets")) || [];

    let selectedTicked =
      JSON.parse(localStorage.getItem("selectedSeats")) || selectedSeats;

    const seats = [];

    for (let i = 1; i <= busDetails.seats; i++) {
      console.log(busDetails.seats, "seatNumber");
      let seatStatus = "available";

      let alreadyBooked = bookedTickets.findIndex(
        (x) => busDetails.id === x.busDetails && x.seat_number === i
      );

      let alreadySelected = selectedTicked.findIndex(
        (x) => busDetails.id === x.busDetails && x.seat_number === i
      );

      if (alreadyBooked > -1) {
        // if(localStorage.getItem(selectedSeats))
        seatStatus = "booked";
      } else if (alreadySelected > -1 && userDetails) {
        seatStatus =
          selectedTicked[alreadySelected]?.passenger_email !== userDetails.email
            ? "booked"
            : "selected";
      }

      seats.push(
        <div
          key={i}
          className={`bus-seat ${seatStatus}`}
          onClick={() =>
            handleSeatClick({
              seat_id: String(`${busDetails.route}${i}`).replace(" ", ""),
              seat_number: i,
              occupied: true,
              passenger_name: userDetails.name,
              passenger_email: userDetails.email,
              busDetails: busDetails.id,
            })
          }
        >
          {i}
        </div>
      );
    }
    return seats;
  };

  const handleCancel = () => {
    let selectedSeat = JSON.parse(localStorage.getItem("selectedSeats")) || [];

    if (selectedSeat.length > 0) {
      let userDetails = JSON.parse(localStorage.getItem("userDetails"));

      localStorage.setItem(
        "selectedSeats",
        JSON.stringify(
          selectedSeat.filter((x, i) => x.passenger_email !== userDetails.email)
        )
      );

      setSelectedSeats([]);
    }

    history("/bus-app");
  };

  useEffect(() => {
    window.addEventListener("popstate", (e) => {
      // Nope, go back to your page
      history(1);
    });

    const interval = setInterval(() => {
      let selectedSeat =
        JSON.parse(localStorage.getItem("selectedSeats")) || [];

      if (selectedSeat.length > 0) {
        let userDetails = JSON.parse(localStorage.getItem("userDetails"));

        setSelectedSeats(
          selectedSeat.filter((x) => x.passenger_email === userDetails.email)
        );
      }

      let selectedTicked =
        JSON.parse(localStorage.getItem("selectedSeats")) || [];

      let bookedTickets =
        JSON.parse(localStorage.getItem("bookedTickets")) || [];

      let alreadyBooked = bookedTickets.filter(
        (x) => busDetails.id === x.busDetails
      );

      let alreadySelected = selectedTicked.filter(
        (x) => busDetails.id === x.busDetails
      );

      setAvailable(
        busDetails.seats - (alreadyBooked.length + alreadySelected.length)
      );
      setSelected(alreadyBooked.length + alreadySelected.length);
    }, 100);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="bus-detail-container">
        <h2>Bus Details</h2>
        <div>
          <p>Bus Number: {busDetails?.number}</p>
          <p>Route: {busDetails?.route}</p>
          <p>Total Seats: {busDetails?.seats}</p>
          <p>
            Available Seats: <FaCouch /> {available}
          </p>
          <p>
            Booked Seats: <FaUsers /> {selected}
          </p>
          <div className="bus-seats-layout">
            <h3>Select Seats:</h3>
            <div className="bus-seats">{renderSeats()}</div>
          </div>
          <button
            className="proceed-button"
            onClick={handleProceedToPayment}
            disabled={selectedSeats.length === 0}
          >
            Proceed to Payment
          </button>

          <button className="proceed-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusDetail;
