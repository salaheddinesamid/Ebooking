import axios from "axios";
import React, { useEffect, useState } from "react";

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
    return(
        <div className="row">

        </div>
    )
}