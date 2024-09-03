import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Rating } from "@mui/material";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

export function Home() {
    const [userAuthenticated, setUserAuthenticated] = useState(localStorage.getItem("authenticated") === "true");
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const [searchClicked, setSearchClicked] = useState(localStorage.getItem("searchClicked") === "true");
    const [isLoginVisible, setIsLoginVisible] = useState(!userAuthenticated);
    
    
    // Show login if not authenticated
    const navigate = useNavigate();
    
    useEffect(() => {
        const authenticated = localStorage.getItem("authenticated") === "true";
        const token = localStorage.getItem("accessToken");
        const search = localStorage.getItem("searchClicked") === "true";
        setUserAuthenticated(authenticated);
        setToken(token);
        setSearchClicked(search);
    }, []);
    function HeroSection() {
        return (
            <section className="hero-section bg-primary text-white text-center py-5">
                <div className="container">
                    <h1 className="display-4">Find Your Perfect Stay</h1>
                    <p className="lead">Explore top-rated accommodations and book your next adventure with EBooking.</p>
                    <button className="btn btn-light btn-lg"><a href="#listing" style={{ textDecoration: "none" }}> Explore Now</a></button>
                </div>
            </section>
        );
    }

    function Listing() {
        const [listings, setListings] = useState([]);
        const [propertyType, setPropertyType] = useState("All");
        const [destination, setDestination] = useState("World");
        const [maxGuests, setMaxGuests] = useState(0);

        const filteredListing = listings
            .filter(list => propertyType === "All" || list.property.propertyType === propertyType)
            .filter(list => destination === "World" || destination === "" || list.property.location.country.countryCode === destination || list.property.location.city.cityName === destination)
            .filter(list => maxGuests === 0 || list == null || maxGuests == list.maxGuests);

        const [typeListing, setTypeListing] = useState([
            { "id": 1, "type": "All" },
            { "id": 2, "type": "Villa" },
            { "id": 3, "type": "Apartment" },
            { "id": 4, "type": "House" },
            { "id": 5, "type": "Cottage" }
        ]);

        useEffect(() => {
            axios.get("http://localhost:8080/api/listing")
                .then(res => {
                    console.log('Fetched listings:', res.data); // Debugging line
                    setListings(res.data);
                })
                .catch(error => console.error("Error fetching listings:", error));
        }, [token]);

        const handleSearchClick = () => {
            const newValue = !searchClicked;
            setSearchClicked(newValue);
            localStorage.setItem('searchClicked', newValue.toString());
        };

        function handleListingNavigate(id) {
            localStorage.setItem("targetListing",id);
            navigate(`/listing/${id}`);
        }

        return (
            <div className="container mt-4" id="listing">
                <div className="row d-flex align-items-center">
                    {typeListing.map((type) => (
                        <div className="col-xl-2" key={type.id}>
                            <p style={{ cursor: "pointer" }} onClick={() => setPropertyType(type.type)}>{type.type}</p>
                        </div>
                    ))}
                    <div className="col-xl-2">
                        <SearchIcon onClick={handleSearchClick} />
                    </div>
                    {searchClicked && (
                        <div className="col-12 d-flex" style={{ marginTop: "50px" }}>
                            <div className="col-xl-4 me-1">
                                <p><b>Destination:</b></p>
                                <input type="text" placeholder="Country, City, State..." className="form-control" value={destination} onChange={(e) => setDestination(e.target.value)} />
                            </div>
                            <div className="col-xl-3 me-1">
                                <p><b>Max guests:</b></p>
                                <input type="number" placeholder="Max guests..." className="form-control" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
                            </div>
                            <div className="col-xl-3 me-1">
                                <p><b>Max Price:</b></p>
                                <input type="text" placeholder="Max price..." className="form-control" />
                            </div>
                            <div className="col-xl-1">
                                <button className="btn btn-danger" onClick={handleSearchClick}><CloseIcon /></button>
                            </div>
                        </div>
                    )}
                </div>
                <hr />
                <div className="row">
                    {filteredListing.map((list) => (
                        <div className="col-md-4 d-flex align-items-stretch" key={list.id} style={{ opacity: userAuthenticated ? "1" : "0.3" }}>
                            <div className="card mb-4" style={{
                                flex: 1,
                                borderRadius: 10,
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                            }}>
                                <img
                                    src={`${list.image}`}
                                    className="card-img-top"
                                    alt={list.title || 'Listing'}
                                    style={{
                                        height: "200px", // Fixed height for all images
                                        objectFit: "cover" // Ensures image covers the area
                                    }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{list.title}</h5>
                                    <p className="card-text">{list.description}</p>
                                    <p className="card-text">
                                        <strong>Location:</strong> {list.property.location.city.cityName}, {list.property.location.country.countryCode}
                                    </p>
                                    <p className="card-text">
                                        <strong>Property Type:</strong> {list.property.propertyType}
                                    </p>
                                    <p className="card-text">
                                        <strong>Price:</strong> ${list.price} per night
                                    </p>
                                    <p className="card-text">
                                        <strong>Max Guests:</strong> {list.maxGuests}
                                    </p>
                                    <div className="card-text">
                                        <Rating name="read-only" defaultValue={list.stars} readOnly />
                                    </div>
                                    <div className="mt-auto">
                                        <a className="btn btn-primary" onClick={() => handleListingNavigate(list.id)}>View Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header/>
            <HeroSection />
            <Listing />
            <Footer />
        </div>
    );
}
