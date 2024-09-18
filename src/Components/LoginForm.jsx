import React, { useState } from "react";
 // For external styling
import googleIcon from "../google_icon.png";
import facebook_logo from "../facebook_logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  // Initialize state within the form if it's a standalone component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (response.data.user.role === "guest") {
          navigate("/home");
        } else if (response.data.user.role === "host") {
          navigate("/dashboard");
        }
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      localStorage.setItem("authenticated", "false");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="form-group mt-4">
        <input
          type="email"
          placeholder="Email@example.com"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mt-4">
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      <div className="row mt-4 mb-3">
        <a
          href="http://localhost:3000/become_host/form"
          style={{ textDecoration: "none", color: "#ff385c" }}
        >
          Become a host?
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
