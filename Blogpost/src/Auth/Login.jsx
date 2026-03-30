import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
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

      // ❌ removed alert
      navigate('/dashboard'); // ✅ direct navigation

    } catch (err) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // send to backend
      const res = await api.post("/googleLogin", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      });

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("userName", user.displayName);

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="form-title">✨ Blognest</h2>
        <p className="text-center mb-3" style={{ color: "#a5b4fc" }}>
          Welcome Back
        </p>
        {/* <h2 className="form-title">Welcome Back</h2> */}
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
            onClick={() => navigate('/register')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Register
          </span>
        </p>
        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
};

export default Login;