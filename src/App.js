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
import { ThankYou } from './routes/ThankYou';

function App() {
  const [listingId, setListingId] = useState(localStorage.getItem("navigateListing"));
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("authenticated") === "true");
  //localStorage.setItem("loginClicked",false);

  useEffect(() => {
    const Expiration =() => {
      localStorage.setItem("authenticated",false)
      localStorage.setItem("accessToken",null);
      localStorage.setItem("user",null);
    }
    if(!isAuthenticated){
      localStorage.setItem("authenticated",false)
    }
    const intervalId = setInterval(Expiration, 1000000);

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
          <Route path='thankyou' element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
