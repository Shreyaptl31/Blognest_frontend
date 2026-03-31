import React, { useState, useEffect } from 'react';  // ✅ add useEffect
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  signInWithRedirect,    // ✅ add this
  getRedirectResult      // ✅ add this
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (!result) return;

        setLoading(true);
        const user = result.user;

        const res = await api.post("/googleLogin", {
          name: user.displayName,
          email: user.email,
        });

        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("userName", `${res.data.name} ${res.data.lname || ""}`.trim());
        navigate("/dashboard");

      } catch (err) {
        console.error("Redirect error:", err);
      } finally {
        setLoading(false);
      }
    };

    handleRedirect();
  }, []);
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
      const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

      let user;
      if (isMobile) {
        await signInWithRedirect(auth, provider);
        return;
      } else {
        const result = await signInWithPopup(auth, provider);
        user = result.user;
      }

      // ✅ Show user something is happening (Render may be waking up)
      setLoading(true);

      // ✅ Retry up to 3 times with 5s delay (handles Render cold start)
      let res;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          res = await api.post("/googleLogin", {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          });
          break; // success, exit retry loop
        } catch (err) {
          if (attempt === 3) throw err; // give up after 3 tries
          await new Promise(r => setTimeout(r, 5000)); // wait 5s then retry
        }
      }

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("userName", `${res.data.name} ${res.data.lname || ""}`.trim());
      navigate("/dashboard");

    } catch (err) {
      console.error("Google login error:", err);
      alert("Login failed. The server may be starting up — please try again in 30 seconds.");
    } finally {
      setLoading(false);
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