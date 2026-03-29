import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', lname: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/userRegister', formData);
      alert(res.data.message);
      navigate('/login'); // Redirect to login page
    } catch (err) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Your Account</h2>

        <div className="input-group">
          <input type="text" name="name" placeholder="First Name" onChange={handleChange} required />
          <input type="text" name="lname" placeholder="Last Name" onChange={handleChange} required />
        </div>

        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Create Password" onChange={handleChange} required />

        <button type="submit" className="btn btn-primary w-100">Sign Up</button>

        <p className="redirect-text">
          Already have an account?{' '}
          <button type="button" className="btn-link" onClick={() => navigate('/login')}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;