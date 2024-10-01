import React, { useEffect, useState } from "react";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SosIcon from '@mui/icons-material/Sos';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Dashboard(){
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const HostCard = ()=>{
        const [host,setHost] = useState(localStorage.getItem("user"));
        useEffect(()=>{
            
        },[])
        return(
            <div className="row" style={{}}>
                <div className="row">
                    <div className="col-xl-4">
                        <img src={host.user.profilePicture} alt="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-10">
                        <p><b>Full Name:</b>{host.user.fullName}</p>
                    </div>
                </div>
            </div>
        )
    }
    function Menu(){
        return(
            <div className="row d-inline">
                <div className="col">
                    <p><b>Menu</b></p>
                </div>
                <div className="col-xl-12 mt-4 mb-4">
                    <button className="btn btn-light"><HomeIcon/> Dashboard</button>
                </div>
                <div className="col-xl-12 mt-4 mb-4">
                    <button className="btn btn-light"><InsightsIcon/>Properties</button>
                </div>
                <div className="col-xl-12 mt-4 mb-4">
                    <button className="btn btn-light"><ReportGmailerrorredIcon/> Reports</button>
                </div>
                <div className="col-xl-12 mt-4 mb-4">
                    <button className="btn btn-light"><NotificationsActiveIcon/> Notification</button> 
                </div>
                <div className="col-xl-12 mt-4 mb-4">
                   <button className="btn btn-light"> <AccountBalanceWalletIcon/> Billing</button> 
                </div>
                <div className="col-xl-12 mt-4 mb-4">
                    <button className="btn btn-light"><ReceiptIcon/> Invoices</button>
                </div>
                <div className="col mt-4 mb-4">
                    <button className="btn btn-light"><SosIcon/> Help center</button>
                </div>
                <div className="col-xl-12 mt-4 mb-4 ">
                    <button className="btn btn-light"><ManageHistoryIcon/> Setting</button>
                </div>
                <div className="d-inline align-items-end">
                    <HostProfile/>
                </div>
            </div>
        )
    }
    function HostProfile(){
        return(
            <div className="row align-items-center" style={{
                    borderRadius:20,
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}>
                <div className="col-xl-2">

                </div>
                <div className="col-xl-7">
                    <div className="row">
                        <p><b>{user.fullName}</b></p>
                    </div>
                    <div className="row">
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className="col-xl-1">
                       <button className="btn btn-danger" onClick={()=>{
                        localStorage.setItem("user",null);
                        localStorage.setItem("authenticated",false);
                        navigate(`/`)
                       }}><LogoutIcon/></button>
                </div>
            </div>
        )
    }
    function NewBooking(){
        return(
            <div className="row" style={{
                padding:20,
                height:"200px",
                margin:10,
    }}>
                <div className="row">
                    <h2>New Booking</h2>
                </div>
                <div className="row align-items-end">
                    <div className="col-xl-8">
                      <h2 style={{
                        fontWeight:"bold",
                        color:"black"
                      }}>20</h2>
                    </div>
                    <div className="col-xl-3">
                        <a href="" style={{
                        textDecoration : "none",
                        color:"#ff385c"
                       }}>Details</a>
                    </div>
                </div>
            </div>
        )
    }
    function TotalBooking(){
        return(
            <div className="row" style={{
                padding:20,
                height:"200px",
                margin:10,
    }}>
                <div className="row">
                    <h2>Total Booking</h2>
                </div>
                <div className="row align-items-end">
                    <div className="col-xl-8">
                       <h3 style={{
                        fontWeight:"bold",
                        color:"black"
                      }}>20/100</h3>
                    </div>
                    <div className="col-xl-3">
                       <a href="" style={{
                        textDecoration : "none",
                        color:"#ff385c"
                       }}>Details</a>
                    </div>
                </div>
            </div>
        )
    }
    function TotalRevenue(){
        return(
            <div className="row" style={{
                padding:20,
                height:"200px",
                margin:10,
    }}>
                <div className="row">
                    <h2>Total Revenue</h2>
                </div>
                <div className="row align-items-end">
                    <div className="col-xl-8">
                       <h3 style={{
                        fontWeight:"bold",
                        color:"#10b981"
                      }}>23.900 $</h3>
                    </div>
                    <div className="col-xl-3">
                       <a href="" style={{
                        textDecoration : "none",
                        color:"#ff385c"
                       }}>Details</a>
                    </div>
                </div>
            </div>
        )
    }
    function Main(){
        return(
                    <div className="row">
                        <div className="col-xl-4">
                           <TotalRevenue/>
                        </div>
                        <div className="col-xl-4">
                           <NewBooking/>
                        </div>
                        <div className="col-xl-4">
                           <TotalBooking/>
                        </div>
                        <div className="row mt-4" style={{
                            padding:20,
                        }}>
                        </div>
                    </div>
        )
    }
    function BookingHistory(){
        const [booking,setBooking] = useState([]);
        useEffect(()=>{
            try{
                let req = axios.get(`http://localhost:8080/api/analytics/booking/${}`)
            }catch(err){

            }
        },[])
        return(
            <div className="row">
                
            </div>
        )
    }
    return(
        <div className="container">
            <div className="row mt-3 mb-3">
               <div className="col-xl-3">
                 <Menu/>
              </div>
              <div className="col-xl-9">
                <Main/>
             </div>
           </div>
        </div>
    )
}