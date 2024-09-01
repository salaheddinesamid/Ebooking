import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IosShareIcon from '@mui/icons-material/IosShare';
import SaveIcon from '@mui/icons-material/Save';
import { Footer } from "../Components/Footer";
export function Listing({listingId}){
    const [listing,setListing] = useState({});
    const [policies,setPolicies] = useState([]);
    const [amenities,setAmenities] = useState([]);
    const [token,setToken] = useState(localStorage.getItem("accessToken"))
    useEffect(()=> {
            let req = axios.get(`http://localhost:8080/api/listing/${listingId}`,{
                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .then(res => {
                console.log('Fetched listings:', res.data); // Debugging line
                setListing(res.data);
            })
            .catch(error => console.error("Error fetching listing:", error));
            let req2 = axios.get(`http://localhost:8080/api/policies/${listingId}`)
            .then(res=>{
                console.log('fetching policies')
                setPolicies(res.data)
            }).catch(()=>{
                console.log("Error fetching policies")
            })
            let req3 = axios.get(`http://localhost:8080/api/listing/amenities/${listingId}`,{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            })
            .then(res=>{
                setAmenities(res.data)
                console.log("FETCHING AMENITIES")
            })
            .catch(()=>{
                console.log("ERROR FETCHING AMENITIES")
            })
        
    },[listingId])

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
    function DisplayListing(){
        return(
            <div className="container mt-4">
               <div className="row align-items-center">
                   <div className="col-xl-7 col-md-8 col-sm-12">
                       <h2 className="mb-0">{`Explore ${listing.description}`}</h2>
                   </div>
                   <div className="col-xl-4 col-md-4 col-sm-12 d-flex justify-content-lg-end justify-content-md-end justify-content-sm-start mt-sm-2 mt-md-0">
                    <button className="btn btn-outline-primary me-2 d-flex align-items-center" style={{
                border:"none"
            }}>
                      <span><b><SaveIcon/>Save</b></span>
                    </button>
                    <button className="btn btn-outline-secondary d-flex align-items-center" style={{border:"none"}}>
                      <span><b><IosShareIcon/>Share</b></span>
                    </button>
                   </div>
               </div>
                <div className="row mt-3 mb-3 container justify-content-center" >
                   <img src={listing.image} alt="" style={{
                      height:"500px",
                      width:"500px",
                      borderRadius:20
                   }}/>
               </div>
               <div className="row" style={{
                marginTop:"100px"
               }}>
                  <div className="col-xl-9">
                    <div className="row">
                        <p><b>Host:</b> {listing.host?.user?.fullName}</p>
                        <p><b>Address:</b> {listing.property?.location?.city?.cityName}, {listing.property?.location?.country?.countryCode}</p>
                    </div>
                    <hr />
                    <div className="row">
                        <h2><b>Policies</b></h2>
                        <ul style={{
                            listStyle:"none"
                        }}>
                            {
                                policies.map((policy)=>(
                                    <li style={{
                                        marginTop:5
                                    }}>{policy.description}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="row">
                        <h2><b>Amenities</b></h2>
                        <ul style={{
                            listStyle:"none"
                        }}>
                            {
                                amenities.map((amenity)=>(
                                    <li style={{
                                        marginTop:5
                                    }}>{amenity.name}</li>
                                ))
                            }
                        </ul>
                    </div>
                  </div>
                  <div className="col-xl-3">
                    <div className="row"
                    style={{
                        maxHeight:"fit-content",
                        borderRadius:10,
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        padding:20
                    }}>
                        <h2>Contact the host</h2>
                        <p><b>Email:</b> {listing.host?.user?.email}</p>
                        <p><b>Phone:</b> {listing.host?.user?.phone}</p>
                        <button className="btn" style={{backgroundColor:"#ff385c",color:"white",fontWeight:"bold"}}>Send message</button>
                    </div>
                  </div>
               </div>
               <div className="container mt-3">
                <Booking/>
               </div>

            </div>

        )
    }
    function Booking(){
        const [nights,setNights] = useState(1);
        const [totalBeforeTax,setTotalBeforeTax] = useState(nights*listing.price);
        const [totalAfterTax,setTotalAfterTax]=  useState(0);
        function checkAvailaiblity(){
            return listing.isAvailable
        }
        const handleNightsChange = (e) => {
            const updatedNights = parseInt(e.target.value, 10) || 1;
            setNights(updatedNights);

            const newTotalBeforeTax = updatedNights * listing.price;
            setTotalBeforeTax(newTotalBeforeTax);
        
            const taxRate = 0.1; // Example tax rate of 10%
            const taxAmount = newTotalBeforeTax * taxRate;
            const newTotalAfterTax = newTotalBeforeTax + taxAmount + 20; // $20 additional fee
            setTotalAfterTax(newTotalAfterTax);
        };
        return (
            <div className="row" style={{
                maxHeight:"fit-content",
                borderRadius:10,
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                padding:20,
                width:"400px"
            }}>
                <div className="row">
                    <div className="col-xl-12">
                       <h3 className="d-inline-block">{listing.price} </h3>
                       <p className="d-inline-block"> $ per night</p>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="" className="label-form">Nights:</label>
                    <input type="number" placeholder="Nights" className="form-control" value={nights} onChange={handleNightsChange}/>
                </div>
                <div className="row mt-3 mb-1">
                    <div className="col-xl-8">
                        <p>{listing.price} x <b>{nights} Nights</b></p>
                    </div>
                    <div className="col-xl-3">{totalBeforeTax} $</div>
                </div>
                <div className="row mt-1 mb-2">
                    <div className="col-xl-8">
                        <p><b>Service Fees</b></p>
                    </div>
                    <div className="col-xl-3">20$</div>
                </div>
                <div className="row">
                    <div className="col-xl-8">
                        <p><b>Total: </b>{totalAfterTax}$</p>
                    </div>
                </div>
                <div className="row">
                    <button className="btn" style={{backgroundColor:"#ff385c",color:"white",fontWeight:"bold"}} disabled={checkAvailaiblity}>Book now</button>
                </div>
            </div>
        )
    }
        return(
        <div>
            <Header />
            <DisplayListing/>
            <Footer/>
        </div>
    )
}