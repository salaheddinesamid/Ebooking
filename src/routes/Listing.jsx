import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IosShareIcon from '@mui/icons-material/IosShare';
import SaveIcon from '@mui/icons-material/Save';
import { Footer } from "../Components/Footer";
export function Listing({listingId}){
    const [listing,setListing] = useState({});
    const [policies,setPolicies] = useState([]);
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
            let req2 = axios.get(`http://localhost:8080/api/listing/policies/${listingId}`)
            .then(res=>{
                console.log('fetching policies')
                setPolicies(res.data)
            }).catch(()=>{
                console.log("Error fetching policies")
            })
        
    },[])

    function Header(){
        return(
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="#" style={{ fontWeight: "bold" }}>EBooking</a>
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
                    <button className="btn btn-outline-primary me-2 d-flex align-items-center">
                      <span><b><SaveIcon/>Save</b></span>
                    </button>
                    <button className="btn btn-outline-secondary d-flex align-items-center">
                      <span><b><IosShareIcon/>Share</b></span>
                    </button>
                </div>
               </div>
               <div className="row mt-3 mb-3" >
                   <img src={listing.image} alt="" style={{
                      height:"500px",
                      borderRadius:20
                   }}/>
               </div>
               <div className="row" style={{
                marginTop:"100px"
               }}>
                <div className="container">
    <div className="row">
        <div className="col-xl-8">
            <div className="row">
                <div className="col">
                    <p><b>Host:</b> {listing.host?.user?.fullName}</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h3>Policies</h3>
                    <ul>
                        {policies.map((policy, index) => (
                            <li key={index}>{policy.description}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

                <div className="col-xl-4">
                    <div style={{
                        maxHeight:"fit-content",
                        borderRadius:10,
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        padding:20
                    }}>
                        <h3>Contact host</h3>
                        <button className="btn" style={{backgroundColor:"#ff385c",color:"white",fontWeight:"bold"}}>Send message</button>
                    </div>
                </div>
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