import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function SignUp() {
    // State to hold form inputs and feedback
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        role:'',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Clear any previous error
        setError('');

        // Simulate API call
        axios.post("http://localhost:8080/api/user/register", formData)
            .then(response => {
                setSuccess('Sign-up successful! Please log in.');
                setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
                navigate("/")
            })
            .catch(error => {
                setError('Error signing up. Please try again.');
            });
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="fullName" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Role</label>
                    <select name="role" id="" className="form-select" onChange={handleChange}>
                        <option value="host">Host</option>
                        <option value="guest">Guest</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="">
                <button type="submit" className="btn btn-primary w-50">Sign Up</button>
                <button type="submit" className="btn btn-danger w-30 ms-1" onClick={()=>navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
