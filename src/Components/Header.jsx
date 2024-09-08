import axios from "axios";
import React, { useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import HouseboatIcon from '@mui/icons-material/Houseboat';
import LogoutIcon from '@mui/icons-material/Logout';

export function Header() {
    const navigate = useNavigate();
    const [userAuthenticated, setUserAuthenticated] = useState(localStorage.getItem("authenticated") === "true");
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const handleLoginClick = async () => {
        const newValue = !isLoginVisible;
        setIsLoginVisible(newValue);
        localStorage.setItem("loginClicked", newValue.toString());
        try {
            const response = await axios.post('http://localhost:8080/api/user/authentication', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': "http://localhost:3000"
                }
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            if (response.data.accessToken) {
                localStorage.setItem("authenticated", "true");
                setUserAuthenticated(true);
                setIsLoginVisible(false);
                window.location.reload(false);
                console.log(response.data);
                localStorage.setItem("user",JSON.stringify(response.data.user)) // Hide login form on successful login
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            console.error("Login failed:", error);
            setUserAuthenticated(false); // Explicitly set to false on error
            localStorage.setItem("authenticated", "false");
        }
    };
    function handleLogOut(){
        localStorage.setItem("user",null)
        localStorage.setItem("accessToken",null)
        localStorage.setItem("authenticated",false)
        window.location.reload(false);
    }
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="http://localhost:3000/" style={{ fontWeight: "bold" }}><HouseboatIcon /> EBooking</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {!userAuthenticated ? (
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <button className="btn me-2" onClick={() => navigate("/registration")}style={{
                                        border:"1px solid #ff385c",
                                        backgroundColor: "white",
                                        color:"#ff385c"
                                    }}>Sign up</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn" onClick={handleLoginClick} style={{
                                        backgroundColor: "#ff385c",
                                        color:"white"
                                    }}>Log in</button>
                                </li>
                            </ul>
                        ) : ''}
                        {isLoginVisible && (
<div className="col-3">
    <input
        type="text"
        placeholder="Email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
    <input
        type="password"
        placeholder="Password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
    <button className="btn btn-light" onClick={handleLoginClick}>Log in</button>
</div>
)}
                    </div>
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