import axios from "axios";
import React, { useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import HouseboatIcon from '@mui/icons-material/Houseboat';
import LogoutIcon from '@mui/icons-material/Logout';

export function Header() {
    const navigate = useNavigate();
    
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
    function handleLogOut(){
        localStorage.setItem("user",null)
        localStorage.setItem("accessToken",null)
        localStorage.setItem("authenticated",false)
        //window.location.reload(false);
        navigate("/")
    }
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="http://localhost:3000/" style={{ fontWeight: "bold" }}><HouseboatIcon /> EBooking</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="align-items-center" style={{ padding: 10, marginLeft: 10 }}>
                        <button className="btn btn-light">{
                             user !== null && user.profilePicture  ? <img src={user.profilePicture} style={{
                                width:"50px",
                                height:"50px",
                                borderRadius:100
                             }}/> : <AccountCircleIcon/>
                            }</button>
                    </div>
                    <div className="row">
                        <button className="btn" onClick={handleLogOut}><LogoutIcon/></button>
                    </div>
                </div>
            </nav>
        </header>
    );
}