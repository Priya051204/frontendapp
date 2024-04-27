import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function CustomerLogin({ onCustomerLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2014/checkcustomerlogin', formData);
      if (response.data) {
        onCustomerLogin(); // Call the callback function provided by the parent component
        navigate("/customerhome"); // Redirect to customer home page
      } else {
        setError("Login Failed. Please check your credentials and try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h3 className="heading"><u>Customer Login</u></h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label className="label">Email ID</label>
          <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="inputContainer">
          <label className="label">Password</label>
          <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
      <p className="registerMessage">Don't have an account? <Link to="/sellerapplicantregistration">Register here</Link></p>
    </div>
  );
}
