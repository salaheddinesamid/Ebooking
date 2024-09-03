import React, { useEffect, useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './routes/Home';
import SignUp from './routes/SignUp';
import { Listing } from './routes/Listing';
import { Booking } from './routes/Booking';
import axios from 'axios';

function App() {
  const [listingId, setListingId] = useState(localStorage.getItem("navigateListing"));
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("authenticated") === "true");

  useEffect(() => {
    const Expiration =() => {
      localStorage.setItem("authenticated",false)
      localStorage.setItem("accessToken",null)
    }
    const intervalId = setInterval(Expiration, 36000000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registration' element={<SignUp />} />
          <Route path='/listing/:listingId' element={<Listing />} />
          <Route path='/booking/:listingId' element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
