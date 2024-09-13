import React, { useState } from "react";
import { Header } from "../Components/Header";
import Country from "../routes/Country.json";
import axios from "axios";
export function HostRequest(){
    const [countries,setCountries] = useState(Country);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("host");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [fullName,setFullName] = useState(`${firstName} ${lastName}`);
    const [nationalId,setNationalId] = useState("");

    const handleSubmit = ()=>{
        const messageDiv = document.createElement("div")
        messageDiv.setAttribute("class","message");
        const paragraph = document.createElement("p")
        paragraph.setAttribute("class","messageParagraph")
        const content = document.createTextNode("Thank you! You will receive a confirmation email in few moment...")
        paragraph.appendChild(content);
        messageDiv.appendChild(paragraph);
        try{
            let req = axios.post("http://localhost:8080/api/user/register",{fullName,email,nationalId,phone,role,password})
            
        }catch(err){

        }
    }

    return(
        <div className="row">
            <Header/>
            <div className="row mt-4 mb-4">
                <div className="row">
                    <div className="col-xl-12">
                        <h1 className="text-center">Request Form</h1>
                    </div>
                </div>
                <div className="row mt-3 mb-3 ps-4 pe-3 justify-content-center">
                    <div className="col-xl-4">
                        <input type="text" name="" id="" className="form-control" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                    </div>
                    <div className="col-xl-4">
                        <input type="text" name="" id="" className="form-control" placeholder="Last Name"  value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                    </div>
                </div>
                <div className="row mt-3 mb-3 ps-4 pe-3 justify-content-center">
                    <div className="col-xl-4">
                        <select name="" id="" className="form-select">
                            {
                                countries.map((country)=>(
                                    <option value={country}>{country.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-xl-4">
                        <input type="text" name="" id="" className="form-control" placeholder="Primary address"/>
                    </div>
                </div>
                <div className="row mt-3 mb-3 ps-4 pe-3 justify-content-center">
                    <div className="col-xl-4">
                        <input type="text" name="" id="" className="form-control" placeholder="National ID"    value={nationalId} onChange={(e)=>setNationalId(e.target.value)}/>
                    </div>
                    <div className="col-xl-4">
                        <input type="email" name="" id="" className="form-control" placeholder="email@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="row mt-3 mb-3 ps-4 pe-3 justify-content-center">
                    <div className="col-xl-4">
                        <input type="text" name="" id="" className="form-control" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="col-xl-4">
                        <input type="text" name="" id="" className="form-control" placeholder="Phone number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                   <div className="col-xl-3">
                        <button className="btn text-center" style={{
                            color:"white",
                            backgroundColor:"#ff385c"
                        }} onClick={handleSubmit}>Submit Request</button>
                    </div>
                </div>
            </div>
        </div>
    )
}