import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Footer } from "../Components/Footer";
///import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePicker } from '@mui/x-date-pickers';


export function Booking({listingId}){
    //const [listing,setListing] = useState({});
    const targetListing = JSON.parse(localStorage.getItem("targetListing"));
    function PaymentMethod(){
        const paymentMethods = [{
            "id":1,
            "name":"Pay now",
            "fees" : 0
        },
        {
            "id": 2,
            "name" : "Pay part now and part later",
            "fees" : 10
        },
    ]
        return(
            <div className="row">
                {
                    paymentMethods.map((method)=>(
                        <div className="row">
                            <div class="form-check">
                               <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                  <div className="row">
                                    <p><b>{method.name}</b></p>
                                    <p>No additinal fees</p>
                                  </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
    function Header(){
        return(
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="http://localhost:3000/" style={{ fontWeight: "bold" }}>EBooking</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="align-items-center" style={{ padding: 10, marginLeft: 10 }}>
                            <button className="btn btn-light"><AccountCircleIcon /></button>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
    return(
        <div className="row">
            <Header/>
            <div className="container mt-4 mt-4" style={{
                    padding:30,
                    maxHeight:"fit-content",
                    borderRadius:10,
                    width:"800px",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}>
                <div className="row mt-4 mb-4" >
                        <h2>Your Reservation:</h2>
                </div>
                <div className="row">
                    <p><b>Description:</b> {targetListing.description},{targetListing.property?.location?.city?.cityName}</p>
                </div>
                <div className="row">
                    <p><b>Destination:</b> {targetListing.property?.location?.country?.countryCode},{targetListing.property?.location?.city?.cityName}</p>
                </div>
                <div className="row">
                    <PaymentMethod/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}