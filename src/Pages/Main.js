import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from './Header'; // Import your Header component
import BusDetail from './BusDetail'; // Import your BusDetail component
import './index.css'; // Import your BusApp CSS

function BusApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming the user is logged in
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBuses() {
      try {
        const response = await axios.get('http://localhost:3000/buses'); // Update with your API endpoint
        setBuses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching buses:', error);
        setIsLoading(false);
      }
    }

    fetchBuses();
  }, []);

  return (
    <Router>
      <div className="bus-app-container">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Switch>
          <Route path="/bus/id">
            <BusDetail />
          </Route>
          <Route path="/">
            <h2>Available Buses</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="bus-table">
                <thead>
                  <tr>
                    <th>Bus Number</th>
                    <th>Route</th>
                    <th>Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus.id}>
                      <td>{bus.number}</td>
                      <td>{bus.route}</td>
                      <td>{bus.seats}</td>
                      <td>
                        <Link to={`/bus/${bus.id}`}>
                          <button className="view-button">View Details</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default BusApp;
