import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useBusContext } from "../Context/AuthContext";
import { MdArrowBackIos } from "react-icons/md";
import "./Payment.css";

function Payment() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const { selectedSeats, updateSelectedSeats, busDetails, setBusDetails } =
    useBusContext();

  useEffect(() => {
    window.addEventListener("popstate", (e) => {
      // Nope, go back to your page
      navigate(1);
    });
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleBookSeats = async () => {
    let bus =await JSON.parse(localStorage.getItem("availableBuses"));

    let busDetail =await bus.find((x) => (x.id = busId));

    console.log(busDetail,"busDetail");

    let array = await JSON.parse(localStorage.getItem("selectedSeats")) || [];

    let bookedTickets = await JSON.parse(localStorage.getItem("bookedTickets")) || [];

    let userDetails = await JSON.parse(localStorage.getItem("userDetails"));

    let selectedTicked = await array.filter((x) => (busDetail.id == x.busDetails && x.passenger_email === userDetails.email));

    console.log(busDetail.id,selectedTicked,bookedTickets,userDetails,array, "busDetail");

    await localStorage.setItem("bookedTickets", JSON.stringify([
      ...bookedTickets,
      ...selectedTicked,
    ]));

    let removedSelectedTicket= await array.filter(
      (x) =>
        busDetail.id == x.busDetails && x.passenger_email !== userDetails.email
    );

    await localStorage.setItem("selectedSeats",JSON.stringify(removedSelectedTicket))

    navigate("/bus-app");
  };

  const handleCancel = () => {
    updateSelectedSeats([]);
    navigate(`/bus-details/${parseInt(busId)}`);
  };

  const Render = () => {
    let bus = JSON.parse(localStorage.getItem("availableBuses"));

    let busDetail = bus.find((x) => (x.id = busId));

    let array = JSON.parse(localStorage.getItem("selectedSeats")) || [];

    let userDetails = JSON.parse(localStorage.getItem("userDetails"));

    let selectedTicked = array.filter(
      (x) => x.passenger_email === userDetails.email
    );

    let string = "";

    selectedTicked.map((x, i) =>
      string === ""
        ? (string = x.seat_number)
        : (string = string + ", " + x.seat_number)
    );

    let price = selectedTicked.length * 1000;
    console.log(price);
    return (
      <>
        <div className="payment-summary">
          <p>Bus Number: {busDetail.number} </p>
          <p>Bus Route: {busDetail.route} </p>
          <p>Booked Seats: {string}</p>
          <p>Total Amount:{selectedTicked.length * 1000} INR</p>
        </div>
      </>
    );
  };

  return (
    <div>
      <Header />
      <div className="payment-container">
        <div className="payment-header">
          <h2>Payment Summary</h2>
        </div>
        <div className="payment-summary">
          <p>{<Render />}</p>
          <p></p>
        </div>
        <div className="payment-buttons">
          <button onClick={handleBookSeats}>Confirm Booking</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
