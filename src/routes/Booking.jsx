import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Footer } from "../Components/Footer";
///import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePicker } from '@mui/x-date-pickers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { Header } from "../Components/Header";

export function Booking({listingId}){
    //const [listing,setListing] = useState({});
    const targetListing = JSON.parse(localStorage.getItem("targetListing"));
    const [booking,setBooking] = useState(JSON.parse(localStorage.getItem("booking")));
    const navigate = useNavigate();
    function PaymentMethod(){
        const paymentMethods = [{
            "id":1,
            "name":"Pay now",
            "description":"No additional fees",
            "fees" : 0
        },
        {
            "id": 2,
            "name" : "Pay part now and part later",
            "description":"Additional fees applied: 3%",
            "fees" : 2
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
                                    <p>{method.description}</p>
                                  </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
    function handleBackClick(){
        localStorage.setItem("booking",null)
        navigate(`/listing/${targetListing}`)
    }
    function handleConfirmation(){
        let req = axios.post("http://localhost:8080/api/booking/book",{booking})
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
                        <h2><button className="btn btn-light" onClick={handleBackClick}><ArrowBackIcon/></button>Your Reservation:</h2>
                </div>
                <div className="row">
                    <p><b>Description:</b> {booking.description},{targetListing.property?.location?.city?.cityName}</p>
                </div>
                <div className="row">
                    <p><b>Destination:</b> {booking.destination?.city.cityName},{booking.destination?.country.countryCode}</p>
                </div>
                <div className="row">
                    <PaymentMethod/>
                </div>
                <div className="row d-flex justify-content-end">
                    <div className="col-xl-3">
                       <h3>Total:{booking.amount} $</h3>
                    </div>
                </div>
                <div className="row mt-4 mb-2">
                    <button className="btn" style={{
                        backgroundColor: "#ff385c", color: "white", fontWeight: "bold"
                    }} onClick={handleConfirmation}>Confirm and Pay</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}