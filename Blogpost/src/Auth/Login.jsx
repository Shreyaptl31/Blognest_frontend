import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/login', formData);
      localStorage.setItem('userName', `${res.data.name} ${res.data.lname}`);
      localStorage.setItem('userId', res.data.userId);
      alert(res.data.message);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Welcome Back</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        <p className="mt-3 text-center">
          Don't have an account?{' '}
          <span
            className="register-link"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;