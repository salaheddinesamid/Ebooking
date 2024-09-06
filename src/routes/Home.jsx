import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Rating } from "@mui/material";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import StarIcon from '@mui/icons-material/Star';

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
            <section className="hero-section text-white text-center py-5" style={{
                backgroundColor: "#ff385c"
            }}>
                <div className="container">
                    <h1 className="display-4">Find Your Perfect Stay</h1>
                    <p className="lead">Explore top-rated accommodations and book your next adventure with EBooking.</p>
                    <button className="btn"><a href="#listing" style={{ textDecoration: "none",color:"white" }}> Explore Now</a></button>
                </div>
            </section>
        );
    }

    function Listing() {
        const [listings, setListings] = useState([]);
        const [propertyType, setPropertyType] = useState("All");
        const [destination, setDestination] = useState("World");
        const [maxGuests, setMaxGuests] = useState(0);
        const [maxPrice,setMaxPrice] = useState(0);

        const filteredListing = listings
            .filter(list => propertyType === "All" || list.property.propertyType === propertyType)
            .filter(list => destination === "World" || destination === "" || list.property.location.country.countryCode === destination || list.property.location.city.cityName === destination)
            .filter(list => maxGuests === 0 || list == null || maxGuests <= list.maxGuests)
            .filter(list=> maxPrice === 0 || maxPrice <= list.price)

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
            <div className="mt-4 pe-3 ps-3" id="listing">
                <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-12 d-flex justify-content-center" style={{ marginTop: "50px" }}>
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
                                <input type="text" placeholder="Max price..." className="form-control" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                            </div>
                        </div>
                </div>
                <hr />
                <div className="row">
                    {filteredListing.map((list) => (
                        <div className="col" style={{
                            maxHeight:'fit-content',
                            borderRadius:10,
                            margin:10,
                            cursor:"pointer"
                        }}onClick={() => handleListingNavigate(list.id)}>
                            <div className="row" >
                                <img src={list.image} alt="" style={{
                            height:'200px',
                            borderRadius:10
                        }}/>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-xl-9">
                                   <p><b>{list.property?.location?.city?.cityName},{list.property?.location?.country?.countryCode}</b></p>
                                </div>
                                <div className="col-xl-3">
                                   <p style={{
                                    fontSize:'15px'
                                   }}><StarIcon fontSize="15px"/>{list.stars}</p>
                                </div>
                            </div>
                            <div className="row">
                                <p>{list.description}</p>
                            </div>
                            <div className="row justify-content-end">
                                <p>{list.price}$ per night</p>
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
            <div className="row">
            <HeroSection />
            </div>
            <div className="row mb-4 mt-4">
               <Listing />
            </div>
            <div className="row">
              <Footer />
            </div>
        </div>
    );
}
