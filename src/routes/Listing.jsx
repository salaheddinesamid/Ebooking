import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IosShareIcon from '@mui/icons-material/IosShare';
import SaveIcon from '@mui/icons-material/Save';
import { Footer } from "../Components/Footer";
import { Rating } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../Components/Header";
import CircularProgress from '@mui/material/CircularProgress';

export function Listing() {
    const [listing, setListing] = useState(null);
    const [policies, setPolicies] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token] = useState(localStorage.getItem("accessToken"));
    const { id } = useParams(); 
    const listingId = localStorage.getItem("targetListing") // Get the listing ID from the URL
    const navigate = useNavigate();
    const [user,setUser] = useState(localStorage.getItem("user"))

    useEffect(() => {
        const fetchListingDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/api/listing/${listingId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                setListing(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching listing:", error);
                setLoading(false);
            }
        };

        const fetchPolicies = async () => {
            try {
                const policiesResponse = await axios.get(`http://localhost:8080/api/policies/${listingId}`);
                setPolicies(policiesResponse.data);
            } catch (error) {
                console.error("Error fetching policies:", error);
            }
        };

        const fetchAmenities = async () => {
            try {
                const amenitiesResponse = await axios.get(`http://localhost:8080/api/listing/amenities/${listingId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                setAmenities(amenitiesResponse.data);
            } catch (error) {
                console.error("Error fetching amenities:", error);
            }
        };

        fetchListingDetails();
        fetchPolicies();
        fetchAmenities();
    }, [listingId, token]);  // Dependency array now includes the listing ID

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    if (!listing) {
        return <div>Listing not found.</div>;
    }

    const DisplayListing = () => (
        <div className="container mt-4">
            <div className="row mt-3 mb-3 align-items-center">
                <div className="col-xl-7 col-md-8 col-sm-12">
                    <h2 className="mb-0">{`Explore ${listing.description}`}</h2>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-12 d-flex justify-content-lg-end justify-content-md-end justify-content-sm-start mt-sm-2 mt-md-0">
                    <button className="btn btn-outline-primary me-2 d-flex align-items-center" style={{ border: "none" }}>
                        <SaveIcon /> <b>Save</b>
                    </button>
                    <button className="btn btn-outline-secondary d-flex align-items-center" style={{ border: "none" }}>
                        <IosShareIcon /> <b>Share</b>
                    </button>
                </div>
            </div>
            <div className="row mt-4 mb-3 container justify-content-center">
                <img src={listing.image} alt={listing.description} style={{ height: "300px", width: "500px", borderRadius: 20 }} />
            </div>
            <div className="row" style={{ marginTop: "100px" }}>
                <div className="col-xl-9">
                    <div className="row">
                        <p><b>Host:</b> {listing.host?.user?.fullName}</p>
                        <p><b>Address:</b> {listing.property?.location?.city?.cityName}, {listing.property?.location?.country?.countryCode}</p>
                    </div>
                    <hr />
                    <div className="row mt-2 mb-2">
                        <h2><b>Policies:</b></h2>
                        <ul style={{ listStyle: "none" }}>
                            {policies.map((policy, index) => (
                                <li key={index} style={{ marginTop: 5 }}>{policy.description}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="row mt-2 mb-2">
                        <h2><b>Amenities:</b></h2>
                        <ul style={{ listStyle: "none" }}>
                            {amenities.map((amenity, index) => (
                                <li key={index} style={{ marginTop: 5 }}>{amenity.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="row mt-3 mb-3">
                        <h2><b>Stars:</b> <Rating value={listing.stars} readOnly name="read-only" /></h2>
                    </div>
                </div>
                <div className="col-xl-3">
                    <div className="row" style={{
                        maxHeight: "fit-content",
                        borderRadius: 10,
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        padding: 20,
                    }}>
                        <h2>Contact the host</h2>
                        <p><b>Email:</b> {listing.host?.user?.email}</p>
                        <p><b>Phone:</b> {listing.host?.user?.phone}</p>
                        <button className="btn" style={{ backgroundColor: "#ff385c", color: "white", fontWeight: "bold" }}>Send message</button>
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <Booking listing={listing} user={user} />
            </div>
        </div>
    );

    return (
        <div>
            <Header />
            <DisplayListing />
            <Footer />
        </div>
    );
}

const Booking = ({ listing, user }) => {
    const [nights, setNights] = useState(1);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const navigate = useNavigate();

    const totalBeforeTax = nights * listing.price;
    const taxRate = 0.1; // Example tax rate of 10%
    const taxAmount = totalBeforeTax * taxRate;
    const totalAfterTax = totalBeforeTax + taxAmount + 20; // $20 additional fee

    const handleNightsChange = (e) => {
        setNights(parseInt(e.target.value, 10) || 1);
    };

    const handleBookingNavigate = () => {
        const booking = {
            userId: user.id,
            total: totalAfterTax,
            listingInformation: {
                name: listing.description
            },
            totalNights: nights,
            fromDate: fromDate,
            toDate: toDate
        };
        localStorage.setItem("booking", JSON.stringify(booking));
        navigate(`/booking/${listing.id}`);
    };

    const handleFromDateChange = (e) => {
        const date = e.target.value;
        setFromDate(date);
        if (toDate) {
            calculateNights(date, toDate);
        }
    };

    const handleToDateChange = (e) => {
        const date = e.target.value;
        setToDate(date);
        if (fromDate) {
            calculateNights(fromDate, date);
        }
    };

    const calculateNights = (from, to) => {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const differenceInTime = toDate - fromDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        setNights(differenceInDays > 0 ? differenceInDays : 1);
    };

    return (
        <div className="row" style={{
            maxHeight: "fit-content",
            borderRadius: 10,
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            padding: 20,
            width: "400px",
        }}>
            <div className="row">
                <div className="col-xl-12">
                    <h3 className="d-inline-block">{listing.price}</h3>
                    <p className="d-inline-block"> $ per night</p>
                </div>
            </div>

            <div className="row mt-1 mb-3">
                <div className="col-xl-6">
                    <label htmlFor="fromDate">From:</label>
                    <input type="date" id="fromDate" className="form-control" onChange={handleFromDateChange} />
                </div>
                <div className="col-xl-6">
                    <label htmlFor="toDate">To:</label>
                    <input type="date" id="toDate" className="form-control" onChange={handleToDateChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-xl-12">
                    <label htmlFor="nights">Total nights:</label>
                    <input type="number" id="nights" value={nights} onChange={handleNightsChange} className="form-control" />
                </div>
            </div>
            <div className="row mt-4">
                <p><b>Total before tax: $</b>{totalBeforeTax.toFixed(2)}</p>
            </div>
            <div className="row">
                <p><b>Tax: $</b>{taxAmount.toFixed(2)}</p>
            </div>
            <div className="row">
                <p><b>Total after tax: $</b>{totalAfterTax.toFixed(2)}</p>
            </div>
            <div className="row">
                <button className="btn" style={{ backgroundColor: "#ff385c", color: "white", fontWeight: "bold" }} onClick={handleBookingNavigate}>Book Now</button>
            </div>
        </div>
    );
};
