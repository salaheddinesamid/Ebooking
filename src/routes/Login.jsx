import React from "react";
import "./Login.css"; // Optional: for external styling
import logo from "../airplane.svg"
import googleIcon from "../google_icon.png"
import facebook_logo from "../facebook_logo.png";
import world_map from "../worldmap.png"
import { Footer } from "../Components/Footer";
export function Login() {
    return (
        <div className="container">
            <div className="row align-items-center" style={{ marginTop: 200,marginBottom:200, marginRight:40,marginLeft:40}}>
                <div className="col-xl-12 col-md-12 login-banner d-flex flex-column justify-content-center text-white">
                    <div className="row" style={{
                        padding:40
                    }}>
                      <div className="col-xl-8">
                         <h1 className="display-4" style={{fontWeight:"bold"}}>EBooking</h1>
                         <h2 style={{
                            display:"inline"
                         }}>Find Your Perfect Stay </h2>
                         <img src={world_map} alt=""  style={{
                            height:"500px",

                         }}/>
                      </div>
                      <div className="col-xl-4">
                        <div className="row" style={{
                            marginTop:100
                        }}>
                            <h3 className="text-center">Welcome</h3>
                            <img src="" alt="" />
                        </div>
                         <div className="row mt-4 mb-4">
                            <input type="email" name="" id="" placeholder="Email@example.com" className="form-control"/>
                         </div>
                         <div className="row mt-4 mb-4">
                            <input type="password" name="" id="" placeholder="Password" className="form-control"/>
                         </div>
                         <div className="col-xl-12 d-flex justify-content-center">
                            <button className="btn" style={{
                                backgroundColor:"white",
                                color:"#ff385c",
                                fontWeight:"bold"
                            }}>Sign in</button>
                         </div>
                         <div className="row mt-4 mb-4">
                            <div className="col-xl-6">
                                <button className="btn" style={{
                                    backgroundColor:"#3b5998",
                                    color:"white",
                                    maxWidth:"400px"
                                }}>Sign in with Facebook<img src={facebook_logo} style={{
                                    width:"20px"
                                }}/></button>
                            </div>
                            <div className="col-xl-6">
                                <button className="btn" style={{
                                    backgroundColor:"black",
                                    color:"white",
                                    maxWidth:"400px"
                                }}>Sign in with Google <img src={googleIcon} style={{
                                    width:"20px"
                                }}/> </button>
                            </div>
                         </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
