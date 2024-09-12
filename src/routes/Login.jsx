import React, { useState } from "react";
import "./Login.css"; // For external styling
import logo from "../airplane.svg";
import googleIcon from "../google_icon.png";
import facebook_logo from "../facebook_logo.png";
import world_map from "../worldmap.png";
import { Footer } from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [errorMessage, setErrorMessage] = useState(""); // Add error state
  const [userAuthenticated, setUserAuthenticated] = useState(localStorage.getItem("authenticated") === "true");
  const [currentComponent,setCurrentComponent] = useState("signin");
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }
    setLoading(true);
    setErrorMessage(""); // Clear previous error
    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/authentication',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "http://localhost:3000"
          }
        }
      );
      localStorage.setItem('accessToken', response.data.accessToken);
      if (response.data.accessToken) {
        localStorage.setItem("authenticated", "true");
        setUserAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home");
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      setUserAuthenticated(false);
      localStorage.setItem("authenticated", "false");
    } finally {
      setLoading(false);
    }
  };
  

  function LoginForm(){
    return(
      <div className="login-form-container">
            
            <div className="form-group mt-4">
              <input
                type="email"
                placeholder="Email@example.com"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
              />
            </div>
            <div className="form-group mt-4">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
            </div>
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
            <div className="d-flex justify-content-center mt-4">
              <button
                className="btn btn-primary login-btn"
                onClick={handleLoginClick}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
            <div className="row mt-4">
              <div className="col-xl-6 col-md-12">
                <button className="btn facebook-btn">
                  <img src={facebook_logo} alt="Facebook" className="icon" />
                  Sign in with Facebook
                </button>
              </div>
              <div className="col-xl-6 col-md-12">
                <button className="btn google-btn">
                  <img src={googleIcon} alt="Google" className="icon" />
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
    )
  }

  function RegisterForm(){
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [confirmEmail,setConfirmEmail] = useState("");
    const [password,setPassword] = useState("");
    const role = "guest"
    function CheckSignUpForm(){
      return firstName && lastName && email && email === confirmEmail && password
    }
    const HandleSignUp = async ()=>{
      const response = await axios.post(
        'http://localhost:8080/api/user/register',
        {firstName,lastName,email, password,role },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "http://localhost:3000"
          }
        }
      );
        localStorage.setItem('accessToken', response.data.accessToken);
      if (response.data.accessToken) {
        localStorage.setItem("authenticated", "true");
        setUserAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home");
      } else {
        throw new Error('Authentication failed');
      }
    }
    return(
      <div className="row">
        <div className="row">
          <div className="col-xl-12">
            <h1 className="text-center">Join us</h1>
          </div>
        </div>
        <div className="row mt-4">
              <div className="col-xl-6 col-md-12">
                <button className="btn facebook-btn">
                  <img src={facebook_logo} alt="Facebook" className="icon" />
                  Sign up with Facebook
                </button>
              </div>
              <div className="col-xl-6 col-md-12">
                <button className="btn google-btn">
                  <img src={googleIcon} alt="Google" className="icon" />
                  Sign up with Google
                </button>
              </div>
            </div>
        <div className="row mt-2 mb-2">
          <div className="col-xl-12">
             <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} />
          </div>
        </div>
        <div className="row mt-2 mb-2">
             <div className="col-xl-12">
                <input type="text" className="form-control"  placeholder="Last Name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
             </div>
          </div>
        <div className="row mt-2 mb-2">
          <div className="col-xl-12">
             <input type="email" className="form-control" placeholder="Email@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
        </div>
        <div className="row mt-2 mb-2">
          <div className="col-xl-12">
             <input type="email" className="form-control" placeholder="e-mail confirmation" value={confirmEmail} onChange={(e)=>{setConfirmEmail(e.target.value)}}/>
          </div>
        </div>
        <div className="row mt-2 mb-2">
          <div className="col-xl-12">
             <input type="password" className="form-control" placeholder="Password" />
          </div>
        </div>
        <div className="row mt-2 mb-2">
          <div className="col-xl-12">
          <button
                className="btn btn-primary login-btn"
                onClick={HandleSignUp}
              >
                {loading ? "Joining us..." : "Sign up"}
              </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="row login-container">
      <div className="row align-items-center login-content">
        <div className="col-xl-7 login-left">
          <h1 className="display-4 login-title">EBooking</h1>
          <h2 className="login-subtitle">Find Your Perfect Stay</h2>
          <img src={world_map} alt="World map" className="world-map" />
        </div>
        <div className="col-xl-4 login-right" style={{
          height : currentComponent === "signin" ? "60vh" : "80vh"
        }}>
        <h3 className="text-center">Welcome</h3>
            <div className="row mt-4 mb-4">
              <div className="col-xl-6 text-center">
                <button className="btn" onClick={()=>{
                  setCurrentComponent("signin")
                }} style={{
                  border: currentComponent === "signin" ? "3px solid #ff385c" : "none"
                }}>Sign in</button>
              </div>
              <div className="col-xl-6 text-center">
                <button className="btn" onClick={()=>{
                  setCurrentComponent("signup")
                }} style={{
                  border: currentComponent === "signup" ? "3px solid #ff385c" : "none"
                }}>Sign up</button>
              </div>
            </div>
          {currentComponent == "signin" ? <LoginForm/> : <RegisterForm/>}
        </div>
      </div>
    </div>
  );
}
