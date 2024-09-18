import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import axios from "axios";
import moment from "moment";

export function GuestBooking() {
    const [booking, setBooking] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        try {
            axios.get(`http://localhost:8080/api/booking/guest_booking/${user.id}`)
                .then(res => {
                    setBooking(res.data);
                    console.log("Fetching", res.data);
                });
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className="row">
            <Header />
            <div className="container" style={{
                padding: 20,
                minHeight: "100vh"
            }}>
                <h2 className="mb-4">Your Booking History</h2>
                {booking.length > 0 ? (
                    booking.map((elem) => (
                        <div className="card mb-4 shadow-sm" key={elem.id}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>{elem.listing?.description}</h5>
                                    </div>
                                    <div className="col-md-2">
                                        <p><b>Check-in:</b> {moment(elem.checkInDate).format('LL')}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p><b>Check-out:</b> {moment(elem.checkOutDate).format('LL')}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p><b>Total nights:</b> {elem.totalNights}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p><b>Status:</b> 
                                            <span className={`badge ${elem.status === "Completed" ? "bg-success" : "bg-danger"}`}>
                                                {elem.status}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-1">
                                        <button className="btn btn-outline-danger btn-sm">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
