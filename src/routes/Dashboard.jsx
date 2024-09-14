import React, { useEffect, useState } from "react";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SosIcon from '@mui/icons-material/Sos';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

export function Dashboard(){
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
                    <button className="btn btn-light"><InsightsIcon/> Activities</button>
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
                    
                </div>
            </div>
        )
    }
    function Main(){
        return(
            <div className="container">

            </div>
        )
    }
    
    return(
        <div className="container mt-3 mb-3">
           <div className="col-xl-4">
            <Menu/>
           </div>
           <div className="col-xl-8">

           </div>
        </div>
    )
}