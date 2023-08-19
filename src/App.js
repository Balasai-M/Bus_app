import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import BusApp from "./Pages/BusApp";
import BusDetail from "./Pages/BusDetail";
import Payment from "./Pages/Payment";

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/bus-app" element={<BusApp />} />
          <Route path="/bus-details/:busId" element={<BusDetail />} />
          <Route path="/bus/payment/:busId" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
} 

export default App;
